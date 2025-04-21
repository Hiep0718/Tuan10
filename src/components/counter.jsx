"use client"

import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { increment, decrement, reset, incrementByAmount, selectCount } from "../features/counter/counterSlice"

export function Counter() {
  const count = useSelector(selectCount)
  const dispatch = useDispatch()
  const [incrementAmount, setIncrementAmount] = useState("2")

  const handleIncrementByAmount = () => {
    if (incrementAmount) {
      dispatch(incrementByAmount(Number(incrementAmount) || 0))
    }
  }

  return (
    <div className="counter-container">
      <h2>Đếm số nâng cao</h2>

      <div className="count-display">{count}</div>

      <div className="button-container">
        <button className="decrement-button" onClick={() => dispatch(decrement())}>
          Giảm
        </button>

        <button className="increment-button" onClick={() => dispatch(increment())}>
          Tăng
        </button>
      </div>

      <div className="counter-advanced">
        <button className="reset-button" onClick={() => dispatch(reset())}>
          Reset
        </button>

        <div className="increment-by-amount">
          <input
            type="number"
            value={incrementAmount}
            onChange={(e) => setIncrementAmount(e.target.value)}
            className="amount-input"
            min="0"
          />
          <button className="increment-by-amount-button" onClick={handleIncrementByAmount}>
            Tăng theo giá trị
          </button>
        </div>
      </div>
    </div>
  )
}
