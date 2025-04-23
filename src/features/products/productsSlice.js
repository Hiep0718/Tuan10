import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Sample product data
const initialProducts = [
  {
    id: 1,
    name: "Điện thoại Samsung Galaxy",
    price: 7990000,
    image: "https://cdn.nguyenkimmall.com/images/companies/_1/dien-thoai/Samsung/S23%20Ultra/dien-thoai-samsung-galaxy-s23-ultra-1.jpg",
    category: "Điện thoại",
    rating: 4.5,
    stock: 15,
  },
  {
    id: 2,
    name: "Laptop Dell XPS",
    price: 29990000,
    image: "https://th.bing.com/th/id/OIP.CATbo2g0muI7wOMVvAXvuwHaEK?rs=1&pid=ImgDetMain",
    category: "Laptop",
    rating: 4.8,
    stock: 8,
  },
  {
    id: 3,
    name: "Tai nghe Apple AirPods",
    price: 4990000,
    image: "https://cdn-images.kiotviet.vn/doandu/2b9d14ac2ef74a72a58cd787521739e8.jpeg",
    category: "Phụ kiện",
    rating: 4.7,
    stock: 20,
  },
  {
    id: 4,
    name: "Đồng hồ thông minh Apple Watch",
    price: 9990000,
    image: "https://th.bing.com/th/id/OIP.qEJ8npyXSZtmiudlzS-5rAHaEA?w=925&h=500&rs=1&pid=ImgDetMain",
    category: "Đồng hồ",
    rating: 4.6,
    stock: 12,
  },
  {
    id: 5,
    name: "Máy ảnh Canon EOS",
    price: 15990000,
    image: "https://th.bing.com/th/id/OIP.yg4-nRpyrvDIzFDTElcU8wAAAA?w=320&h=180&rs=1&pid=ImgDetMain",
    category: "Máy ảnh",
    rating: 4.4,
    stock: 5,
  },
  {
    id: 6,
    name: "Bàn phím cơ Logitech",
    price: 2490000,
    image: "https://th.bing.com/th/id/OIP.YlueYL0zzMzxB_DwolsiyQHaDF?rs=1&pid=ImgDetMain",
    category: "Phụ kiện",
    rating: 4.3,
    stock: 18,
  },
]

// Create async thunk for fetching products (mock API)
export const fetchProducts = createAsyncThunk("products/fetchProducts", async (_, { rejectWithValue }) => {
  try {
    // Simulate API call with timeout
    await new Promise((resolve) => setTimeout(resolve, 800))
    return initialProducts
  } catch (error) {
    error.message = "Không thể tải dữ liệu sản phẩm"
    // Handle error and return a rejected value
    return rejectWithValue("Không thể tải dữ liệu sản phẩm")
  }
})

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    filteredItems: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    filters: {
      category: "all",
      searchTerm: "",
      sortBy: "default",
      priceRange: { min: 0, max: 50000000 },
    },
  },
  reducers: {
    // Filter products by category
    filterByCategory: (state, action) => {
      state.filters.category = action.payload
      applyFilters(state)
    },
    // Filter products by search term
    setSearchTerm: (state, action) => {
      state.filters.searchTerm = action.payload
      applyFilters(state)
    },
    // Sort products by price or rating
    sortProducts: (state, action) => {
      state.filters.sortBy = action.payload
      applyFilters(state)
    },
    // Filter products by price range
    setPriceRange: (state, action) => {
      state.filters.priceRange = action.payload
      applyFilters(state)
    },
    // Add a new product (for admin purposes)
    addProduct: (state, action) => {
      const newProduct = {
        ...action.payload,
        id: Date.now(),
      }
      state.items.push(newProduct)
      applyFilters(state)
    },
    // Update a product (for admin purposes)
    updateProduct: (state, action) => {
      const index = state.items.findIndex((product) => product.id === action.payload.id)
      if (index !== -1) {
        state.items[index] = action.payload
        applyFilters(state)
      }
    },
    // Delete a product (for admin purposes)
    deleteProduct: (state, action) => {
      state.items = state.items.filter((product) => product.id !== action.payload)
      applyFilters(state)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.items = action.payload
        state.filteredItems = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })
  },
})

// Helper function to apply filters
const applyFilters = (state) => {
  const { category, searchTerm, sortBy, priceRange } = state.filters

  let result = [...state.items]

  // Apply category filter
  if (category !== "all") {
    result = result.filter((product) => product.category === category)
  }

  // Apply search filter
  if (searchTerm) {
    const term = searchTerm.toLowerCase()
    result = result.filter(
      (product) => product.name.toLowerCase().includes(term) || product.category.toLowerCase().includes(term),
    )
  }

  // Apply price range filter
  result = result.filter((product) => product.price >= priceRange.min && product.price <= priceRange.max)

  // Apply sorting
  if (sortBy === "price-asc") {
    result.sort((a, b) => a.price - b.price)
  } else if (sortBy === "price-desc") {
    result.sort((a, b) => b.price - a.price)
  } else if (sortBy === "rating") {
    result.sort((a, b) => b.rating - a.rating)
  }

  state.filteredItems = result
}

// Export actions
export const {
  filterByCategory,
  setSearchTerm,
  sortProducts,
  setPriceRange,
  addProduct,
  updateProduct,
  deleteProduct,
} = productsSlice.actions

// Export selectors
export const selectAllProducts = (state) => state.products.items
export const selectFilteredProducts = (state) => state.products.filteredItems
export const selectProductsStatus = (state) => state.products.status
export const selectProductsError = (state) => state.products.error
export const selectProductFilters = (state) => state.products.filters

export default productsSlice.reducer
