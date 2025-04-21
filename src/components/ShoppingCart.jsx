"use client"

import { useSelector, useDispatch } from "react-redux"
import {
  removeItem,
  updateQuantity,
  clearCart,
  selectCartItems,
  selectCartTotalQuantity,
  selectCartTotalPrice,
} from "../features/cart/cartSlice"

export function ShoppingCart() {
  const cartItems = useSelector(selectCartItems)
  const totalQuantity = useSelector(selectCartTotalQuantity)
  const totalPrice = useSelector(selectCartTotalPrice)
  const dispatch = useDispatch()

  const handleQuantityChange = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity: Number.parseInt(quantity) }))
  }

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id))
  }

  const handleClearCart = () => {
    dispatch(clearCart())
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
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
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
                    <button
                      className="quantity-button"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
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

          <div className="cart-footer">
            <div className="cart-total">
              <span>Tổng cộng:</span>
              <span className="total-price">{formatPrice(totalPrice)}</span>
            </div>
            <div className="cart-actions">
              <button className="clear-cart-button" onClick={handleClearCart}>
                Xóa giỏ hàng
              </button>
              <button className="checkout-button">Thanh toán</button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
