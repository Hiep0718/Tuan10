import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "../features/counter/counterSlice"
import todosReducer from "../features/todos/todosSlice"
import themeReducer from "../features/theme/themeSlice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todosReducer,
    theme: themeReducer,
  },
})
