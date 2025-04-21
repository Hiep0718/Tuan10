import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

// Create async thunk for fetching users
export const fetchUsers = createAsyncThunk("users/fetchUsers", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users")

    if (!response.ok) {
      throw new Error("Server Error!")
    }

    const data = await response.json()
    return data
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

// Initial state
const initialState = {
  users: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
}

// Create the users slice
const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // Standard reducers here (if needed)
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.users = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload || "Something went wrong"
      })
  },
})

// Export selectors
export const selectAllUsers = (state) => state.users.users
export const selectUsersStatus = (state) => state.users.status
export const selectUsersError = (state) => state.users.error

export default usersSlice.reducer
