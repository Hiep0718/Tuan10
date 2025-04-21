"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { logout, setUserInfo, selectUser } from "../features/auth/authSlice"

export function UserProfile() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState(user?.name || "")

  const handleLogout = () => {
    dispatch(logout())
  }

  const handleUpdateProfile = (e) => {
    e.preventDefault()
    dispatch(setUserInfo({ name }))
    setIsEditing(false)
  }

  return (
    <div className="user-profile-container">
      <div className="user-profile-header">
        <h2>Thông tin người dùng</h2>
      </div>

      <div className="user-profile-content">
        <div className="user-avatar">
          <img src={user?.avatar || "https://via.placeholder.com/150"} alt="Avatar" />
        </div>

        {isEditing ? (
          <form onSubmit={handleUpdateProfile} className="edit-profile-form">
            <div className="form-group">
              <label htmlFor="name">Tên</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="auth-input"
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" value={user?.email} disabled className="auth-input disabled" />
              <small>Email không thể thay đổi</small>
            </div>

            <div className="profile-actions">
              <button type="submit" className="save-button">
                Lưu thay đổi
              </button>
              <button
                type="button"
                className="cancel-button"
                onClick={() => {
                  setIsEditing(false)
                  setName(user?.name || "")
                }}
              >
                Hủy
              </button>
            </div>
          </form>
        ) : (
          <div className="user-info">
            <h3>{user?.name}</h3>
            <p>{user?.email}</p>

            <div className="profile-actions">
              <button onClick={() => setIsEditing(true)} className="edit-button">
                Chỉnh sửa thông tin
              </button>
              <button onClick={handleLogout} className="logout-button">
                Đăng xuất
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="user-profile-footer">
        <p>Đã đăng nhập thành công!</p>
      </div>
    </div>
  )
}
