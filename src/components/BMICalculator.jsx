"use client"

import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { updateBMIInput, calculateBMIResult, selectBMIData } from "../features/calculators/calculatorsSlice"

export function BMICalculator() {
  const bmiData = useSelector(selectBMIData)
  const dispatch = useDispatch()

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    dispatch(updateBMIInput({ field: name, value }))
  }

  // Calculate BMI when inputs change
  useEffect(() => {
    dispatch(calculateBMIResult())
  }, [bmiData.height, bmiData.weight, dispatch])

  // Format number with commas
  const formatNumber = (num) => {
    return new Intl.NumberFormat("vi-VN").format(num)
  }

  return (
    <div className="calculator-container">
      <h2>Tính chỉ số BMI</h2>

      <div className="calculator-form">
        <div className="form-group">
          <label htmlFor="height">Chiều cao (cm)</label>
          <input
            type="number"
            id="height"
            name="height"
            value={bmiData.height}
            onChange={handleInputChange}
            min="50"
            max="250"
            className="calculator-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="weight">Cân nặng (kg)</label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={bmiData.weight}
            onChange={handleInputChange}
            min="10"
            max="300"
            className="calculator-input"
          />
        </div>
      </div>

      {bmiData.result !== null && (
        <div className="calculator-result">
          <div className="result-header">Kết quả</div>
          <div className="result-value">
            BMI = <strong>{bmiData.result}</strong>
          </div>
          <div className="result-category" style={{ color: bmiData.color }}>
            {bmiData.category}
          </div>
          <div className="result-explanation">
            <p>Phân loại chỉ số BMI:</p>
            <ul>
              <li>
                Dưới 18.5: <span style={{ color: "blue" }}>Thiếu cân</span>
              </li>
              <li>
                18.5 - 24.9: <span style={{ color: "green" }}>Bình thường</span>
              </li>
              <li>
                25.0 - 29.9: <span style={{ color: "orange" }}>Thừa cân</span>
              </li>
              <li>
                Trên 30.0: <span style={{ color: "red" }}>Béo phì</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
