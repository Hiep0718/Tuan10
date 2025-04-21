"use client"

import { useSelector, useDispatch } from "react-redux"
import { toggleTheme, selectTheme } from "../features/theme/themeSlice"

export function ThemeToggle() {
  const theme = useSelector(selectTheme)
  const dispatch = useDispatch()

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="theme-toggle-button"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? "🌙" : "☀️"} {theme === "light" ? "Chế độ tối" : "Chế độ sáng"}
    </button>
  )
}
