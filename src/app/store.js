import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "../features/counter/counterSlice"
import todosReducer from "../features/todos/todosSlice"
import themeReducer from "../features/theme/themeSlice"
import cartReducer from "../features/cart/cartSlice"
import authReducer from "../features/auth/authSlice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todosReducer,
    theme: themeReducer,
    cart: cartReducer,
    auth: authReducer,
  },
})
