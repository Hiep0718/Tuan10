"use client"

import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  removeItem,
  updateQuantity,
  clearCart,
  incrementItem,
  decrementItem,
  applyDiscount,
  saveCart,
  addItem,
  selectCartItems,
  selectCartTotalQuantity,
  selectCartTotalPrice,
  selectCartDiscount,
  selectCartLastSaved,
  selectCartTotalWithDiscount,
} from "../features/cart/cartSlice"

export function ShoppingCart() {
  const cartItems = useSelector(selectCartItems)
  const totalQuantity = useSelector(selectCartTotalQuantity)
  const subtotal = useSelector(selectCartTotalPrice)
  const discount = useSelector(selectCartDiscount)
  const total = useSelector(selectCartTotalWithDiscount)
  const lastSaved = useSelector(selectCartLastSaved)
  const dispatch = useDispatch()

  // State for discount code input
  const [discountCode, setDiscountCode] = useState("")

  // Load cart from localStorage on component mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart")
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart)
        parsedCart.items.forEach((item) => {
          dispatch(addItem(item))
        })
      }
    } catch (error) {
      console.error("Failed to load cart:", error)
    }
  }, [dispatch])

  // Save cart to localStorage when it changes
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cart", JSON.stringify({ items: cartItems }))
    }
  }, [cartItems])

  // Handle item quantity changes
  const handleQuantityChange = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity: Number.parseInt(quantity) }))
  }

  // Handle item removal
  const handleRemoveItem = (id) => {
    dispatch(removeItem(id))
  }

  // Handle cart clearing
  const handleClearCart = () => {
    if (window.confirm("Bạn có chắc muốn xóa tất cả sản phẩm khỏi giỏ hàng?")) {
      dispatch(clearCart())
      localStorage.removeItem("cart")
    }
  }

  // Handle discount code application
  const handleApplyDiscount = () => {
    dispatch(applyDiscount(discountCode))
    // Store the fact that a discount was applied
    if (discountCode === "GIAMGIA10") {
      localStorage.setItem("discount", discountCode)
    }
  }

  // Handle saving cart for later
  const handleSaveCart = () => {
    dispatch(saveCart())
    alert("Giỏ hàng đã được lưu thành công!")
  }

  // Format price in VND
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price)
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2>Giỏ hàng</h2>
        <div className="cart-summary">
          <span>{totalQuantity} sản phẩm</span>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Giỏ hàng của bạn đang trống</p>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image || "/placeholder.svg"} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-price">{formatPrice(item.price)}</p>
                </div>
                <div className="cart-item-actions">
                  <div className="quantity-control">
                    <button
                      className="quantity-button"
                      onClick={() => dispatch(decrementItem(item.id))}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                      className="quantity-input"
                    />
                    <button className="quantity-button" onClick={() => dispatch(incrementItem(item.id))}>
                      +
                    </button>
                  </div>
                  <button className="remove-item-button" onClick={() => handleRemoveItem(item.id)}>
                    Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-discount">
            <input
              type="text"
              placeholder="Nhập mã giảm giá"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              className="discount-input"
            />
            <button className="apply-discount-button" onClick={handleApplyDiscount}>
              Áp dụng
            </button>
          </div>

          {discount > 0 && (
            <div className="discount-applied">
              <p>Mã giảm giá đã được áp dụng: -{(discount * 100).toFixed(0)}%</p>
            </div>
          )}

          <div className="cart-footer">
            <div className="cart-totals">
              <div className="total-row">
                <span>Tạm tính:</span>
                <span>{formatPrice(subtotal)}</span>
              </div>

              {discount > 0 && (
                <div className="total-row discount-row">
                  <span>Giảm giá:</span>
                  <span>-{formatPrice(subtotal * discount)}</span>
                </div>
              )}

              <div className="total-row grand-total">
                <span>Tổng cộng:</span>
                <span className="total-price">{formatPrice(total)}</span>
              </div>
            </div>

            <div className="cart-actions">
              <button className="save-cart-button" onClick={handleSaveCart}>
                Lưu giỏ hàng
              </button>
              <button className="clear-cart-button" onClick={handleClearCart}>
                Xóa giỏ hàng
              </button>
              <button className="checkout-button">Thanh toán</button>
            </div>

            {lastSaved && (
              <div className="cart-saved-info">
                <small>Đã lưu lúc: {new Date(lastSaved).toLocaleString("vi-VN")}</small>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
