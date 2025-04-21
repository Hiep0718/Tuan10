import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "../features/counter/counterSlice"
import todosReducer from "../features/todos/todosSlice"
import themeReducer from "../features/theme/themeSlice"
import cartReducer from "../features/cart/cartSlice"
import authReducer from "../features/auth/authSlice"
import usersReducer from "../features/users/usersSlice"
import calculatorsReducer from "../features/calculators/calculatorsSlice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todosReducer,
    theme: themeReducer,
    cart: cartReducer,
    auth: authReducer,
    users: usersReducer,
    calculators: calculatorsReducer,
  },
})
