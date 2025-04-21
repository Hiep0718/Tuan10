"use client"

import { useSelector } from "react-redux"
import { selectIsLoggedIn } from "../features/auth/authSlice"
import { LoginForm } from "./LoginForm"
import { UserProfile } from "./UserProfile"

export function Auth() {
  const isLoggedIn = useSelector(selectIsLoggedIn)

  return <div className="auth-container">{isLoggedIn ? <UserProfile /> : <LoginForm />}</div>
}
