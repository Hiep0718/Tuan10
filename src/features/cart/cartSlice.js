import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  items: [],
  discount: 0,
  lastSaved: null,
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload
      const item = state.items.find((item) => item.id === id)
      if (item) {
        item.quantity = Math.max(1, quantity)
      }
    },
    clearCart: (state) => {
      state.items = []
    },
    // Increment item quantity by 1
    incrementItem: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload)
      if (item) {
        item.quantity += 1
      }
    },

    // Decrement item quantity by 1
    decrementItem: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload)
      if (item && item.quantity > 1) {
        item.quantity -= 1
      }
    },

    // Apply discount code (mock functionality)
    applyDiscount: (state, action) => {
      // In a real app, this would validate the discount code against an API
      // Here we just mock applying a 10% discount if code is "GIAMGIA10"
      if (action.payload === "GIAMGIA10") {
        state.discount = 0.1 // 10% discount
      } else {
        state.discount = 0
      }
    },

    // Save cart for later (persist to localStorage in component)
    saveCart: (state) => {
      state.lastSaved = new Date().toISOString()
    },
  },
})

export const { addItem, removeItem, updateQuantity, clearCart, incrementItem, decrementItem, applyDiscount, saveCart } =
  cartSlice.actions

export const selectCartItems = (state) => state.cart.items
export const selectCartTotalQuantity = (state) => state.cart.items.reduce((total, item) => total + item.quantity, 0)
export const selectCartTotalPrice = (state) =>
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0)

export const selectCartDiscount = (state) => state.cart.discount
export const selectCartLastSaved = (state) => state.cart.lastSaved
export const selectCartTotalWithDiscount = (state) => {
  const subtotal = state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0)
  const discount = subtotal * state.cart.discount
  return subtotal - discount
}

export default cartSlice.reducer
