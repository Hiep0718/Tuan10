"use client"

import { useDispatch } from "react-redux"
import { addItem } from "../features/cart/cartSlice"

// Sample product data
const products = [
  { id: 1, name: "Điện thoại Samsung Galaxy", price: 7990000, image: "https://cdn.nguyenkimmall.com/images/companies/_1/dien-thoai/Samsung/S23%20Ultra/dien-thoai-samsung-galaxy-s23-ultra-1.jpg" },
  { id: 2, name: "Laptop Dell XPS", price: 29990000, image: "https://th.bing.com/th/id/OIP.CATbo2g0muI7wOMVvAXvuwHaEK?rs=1&pid=ImgDetMain" },
  { id: 3, name: "Tai nghe Apple AirPods", price: 4990000, image: "https://cdn-images.kiotviet.vn/doandu/2b9d14ac2ef74a72a58cd787521739e8.jpeg" },
  { id: 4, name: "Đồng hồ thông minh Apple Watch", price: 9990000, image: "https://th.bing.com/th/id/OIP.qEJ8npyXSZtmiudlzS-5rAHaEA?w=925&h=500&rs=1&pid=ImgDetMain" },
  { id: 5, name: "Máy ảnh Canon EOS", price: 15990000, image: "https://th.bing.com/th/id/OIP.yg4-nRpyrvDIzFDTElcU8wAAAA?w=320&h=180&rs=1&pid=ImgDetMain" },
  { id: 6, name: "Bàn phím cơ Logitech", price: 2490000, image: "https://th.bing.com/th/id/OIP.YlueYL0zzMzxB_DwolsiyQHaDF?rs=1&pid=ImgDetMain" },
]

export function ProductList() {
  const dispatch = useDispatch()

  const handleAddToCart = (product) => {
    dispatch(addItem(product))
  }

  // Format price in VND
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price)
  }

  return (
    <div className="product-list-container">
      <h2>Sản phẩm</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image || "/placeholder.svg"} alt={product.name} className="product-image" />
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">{formatPrice(product.price)}</p>
            </div>
            <button className="add-to-cart-button" onClick={() => handleAddToCart(product)}>
              Thêm vào giỏ
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
