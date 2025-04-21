import { createSlice } from "@reduxjs/toolkit"

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
  },
})

// Export the actions
export const { increment, decrement } = counterSlice.actions

// Export the selector
export const selectCount = (state) => state.counter.value

// Export the reducer
export default counterSlice.reducer
