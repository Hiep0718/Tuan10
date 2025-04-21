"use client"

import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { fetchUsers, selectAllUsers, selectUsersStatus, selectUsersError } from "../features/users/usersSlice"

export function UsersList() {
  const dispatch = useDispatch()
  const users = useSelector(selectAllUsers)
  const status = useSelector(selectUsersStatus)
  const error = useSelector(selectUsersError)

  useEffect(() => {
    // Only fetch users if we haven't already
    if (status === "idle") {
      dispatch(fetchUsers())
    }
  }, [status, dispatch])

  // Render based on status
  let content

  if (status === "loading") {
    content = (
      <div className="users-loading">
        <div className="loading-spinner"></div>
        <p>Đang tải dữ liệu...</p>
      </div>
    )
  } else if (status === "succeeded") {
    content = (
      <div className="users-grid">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <div className="user-card-header">
              <div className="user-avatar">{user.name.charAt(0)}</div>
              <h3>{user.name}</h3>
            </div>
            <div className="user-card-body">
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Phone:</strong> {user.phone}
              </p>
              <p>
                <strong>Website:</strong> {user.website}
              </p>
              <p>
                <strong>Company:</strong> {user.company.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    )
  } else if (status === "failed") {
    content = <div className="users-error">Error: {error}</div>
  }

  return (
    <div className="users-container">
      <div className="users-header">
        <h2>Danh sách người dùng</h2>
        <button className="refresh-button" onClick={() => dispatch(fetchUsers())} disabled={status === "loading"}>
          {status === "loading" ? "Đang tải..." : "Tải lại dữ liệu"}
        </button>
      </div>
      {content}
    </div>
  )
}
