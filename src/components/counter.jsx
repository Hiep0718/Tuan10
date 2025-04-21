"use client"

import { useSelector, useDispatch } from "react-redux"
import { increment, decrement, selectCount } from "../features/counter/counterSlice"

export function Counter() {
  const count = useSelector(selectCount)
  const dispatch = useDispatch()

  return (
    <div className="counter-container">
      <h2>Đếm số đơn giản</h2>

      <div className="count-display">{count}</div>

      <div className="button-container">
        <button className="decrement-button" onClick={() => dispatch(decrement())}>
          Giảm
        </button>

        <button className="increment-button" onClick={() => dispatch(increment())}>
          Tăng
        </button>
      </div>
    </div>
  )
}
