"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login, selectIsLoading, selectAuthError } from "../features/auth/authSlice"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const isLoading = useSelector(selectIsLoading)
  const error = useSelector(selectAuthError)

  const handleSubmit = async (e) => {
    e.preventDefault()
    await dispatch(login({ email, password }))
  }

  return (
    <div className="auth-form-container">
      <h2>Đăng nhập</h2>

      {error && <div className="auth-error">{error}</div>}

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="auth-input"
            placeholder="Nhập email của bạn"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Mật khẩu</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="auth-input"
            placeholder="Nhập mật khẩu của bạn"
          />
        </div>

        <div className="form-footer">
          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? "Đang xử lý..." : "Đăng nhập"}
          </button>
        </div>

        <div className="form-help">
          <p>
            <small>
              * Để đăng nhập demo, sử dụng:
              <br />
              Email: user@example.com
              <br />
              Mật khẩu: password
            </small>
          </p>
        </div>
      </form>
    </div>
  )
}
