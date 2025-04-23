"use client"

import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  fetchProducts,
  filterByCategory,
  setSearchTerm,
  sortProducts,
  setPriceRange,
  selectFilteredProducts,
  selectProductsStatus,
  selectProductsError,
  selectProductFilters,
} from "../features/products/productsSlice"
import { addItem } from "../features/cart/cartSlice"

export function ProductList() {
  const dispatch = useDispatch()
  const products = useSelector(selectFilteredProducts)
  const status = useSelector(selectProductsStatus)
  const error = useSelector(selectProductsError)
  const filters = useSelector(selectProductFilters)

  // Local state for price range
  const [priceRange, setPriceRangeState] = useState(filters.priceRange)

  // Fetch products on component mount
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts())
    }
  }, [status, dispatch])

  const handleAddToCart = (product) => {
    dispatch(addItem(product))
  }

  // Format price in VND
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price)
  }

  // Handle category change
  const handleCategoryChange = (e) => {
    dispatch(filterByCategory(e.target.value))
  }

  // Handle search input
  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value))
  }

  // Handle sort change
  const handleSortChange = (e) => {
    dispatch(sortProducts(e.target.value))
  }

  // Handle price range change
  const handlePriceChange = (e) => {
    const { name, value } = e.target
    const newRange = { ...priceRange, [name]: Number.parseInt(value, 10) }
    setPriceRangeState(newRange)
  }

  // Apply price filter
  const applyPriceFilter = () => {
    dispatch(setPriceRange(priceRange))
  }

  // Render based on status
  if (status === "loading") {
    return (
      <div className="product-list-container">
        <h2>Đang tải sản phẩm...</h2>
        <div className="loading-spinner"></div>
      </div>
    )
  }

  if (status === "failed") {
    return (
      <div className="product-list-container">
        <h2>Sản phẩm</h2>
        <div className="error-message">Lỗi: {error}</div>
      </div>
    )
  }

  return (
    <div className="product-list-container">
      <h2>Sản phẩm</h2>

      <div className="product-filters">
        <div className="search-filter">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={filters.searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div>

        <div className="filter-controls">
          <div className="filter-group">
            <label>Danh mục:</label>
            <select value={filters.category} onChange={handleCategoryChange} className="filter-select">
              <option value="all">Tất cả</option>
              <option value="Điện thoại">Điện thoại</option>
              <option value="Laptop">Laptop</option>
              <option value="Phụ kiện">Phụ kiện</option>
              <option value="Đồng hồ">Đồng hồ</option>
              <option value="Máy ảnh">Máy ảnh</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Sắp xếp:</label>
            <select value={filters.sortBy} onChange={handleSortChange} className="filter-select">
              <option value="default">Mặc định</option>
              <option value="price-asc">Giá tăng dần</option>
              <option value="price-desc">Giá giảm dần</option>
              <option value="rating">Đánh giá cao</option>
            </select>
          </div>
        </div>

        <div className="price-filter">
          <div className="price-range">
            <div className="range-group">
              <label>Giá từ:</label>
              <input
                type="number"
                name="min"
                min="0"
                step="1000000"
                value={priceRange.min}
                onChange={handlePriceChange}
                className="price-input"
              />
            </div>
            <div className="range-group">
              <label>đến:</label>
              <input
                type="number"
                name="max"
                min="0"
                step="1000000"
                value={priceRange.max}
                onChange={handlePriceChange}
                className="price-input"
              />
            </div>
          </div>
          <button onClick={applyPriceFilter} className="apply-filter-button">
            Áp dụng
          </button>
        </div>
      </div>

      <div className="product-results">
        <p className="result-count">{products.length} sản phẩm</p>
      </div>

      <div className="product-grid">
        {products.length === 0 ? (
          <p className="no-products">Không tìm thấy sản phẩm phù hợp</p>
        ) : (
          products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image || "/placeholder.svg"} alt={product.name} className="product-image" />
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <div className="product-meta">
                  <p className="product-price">{formatPrice(product.price)}</p>
                  <p className="product-rating">⭐ {product.rating}</p>
                </div>
                <p className="product-category">{product.category}</p>
                <p className="product-stock">{product.stock} sản phẩm có sẵn</p>
              </div>
              <button className="add-to-cart-button" onClick={() => handleAddToCart(product)}>
                Thêm vào giỏ
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
