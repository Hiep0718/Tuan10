import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  user: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true
      state.error = null
    },
    loginSuccess: (state, action) => {
      state.isLoading = false
      state.isLoggedIn = true
      state.user = action.payload
      state.error = null
    },
    loginFailure: (state, action) => {
      state.isLoading = false
      state.error = action.payload
    },
    logout: (state) => {
      state.isLoggedIn = false
      state.user = null
    },
    setUserInfo: (state, action) => {
      state.user = { ...state.user, ...action.payload }
    },
  },
})

// Export actions
export const { loginStart, loginSuccess, loginFailure, logout, setUserInfo } = authSlice.actions

// Async thunk for login
export const login = (credentials) => async (dispatch) => {
  try {
    dispatch(loginStart())

    // Simulate API call with timeout
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock validation - in a real app, this would be an API call
    if (credentials.email === "user@example.com" && credentials.password === "password") {
      const userData = {
        id: "1",
        name: "Người dùng",
        email: credentials.email,
        avatar: "https://via.placeholder.com/150",
      }
      dispatch(loginSuccess(userData))
      return { success: true }
    } else {
      dispatch(loginFailure("Email hoặc mật khẩu không đúng"))
      return { success: false, error: "Email hoặc mật khẩu không đúng" }
    }
  } catch (error) {
    dispatch(loginFailure(error.message || "Đã xảy ra lỗi"))
    return { success: false, error: error.message || "Đã xảy ra lỗi" }
  }
}

// Selectors
export const selectUser = (state) => state.auth.user
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn
export const selectIsLoading = (state) => state.auth.isLoading
export const selectAuthError = (state) => state.auth.error

export default authSlice.reducer
