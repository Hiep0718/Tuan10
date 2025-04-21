"use client"

import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { updateTaxInput, calculateTaxResult, selectTaxData } from "../features/calculators/calculatorsSlice"

export function TaxCalculator() {
  const taxData = useSelector(selectTaxData)
  const dispatch = useDispatch()

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    dispatch(updateTaxInput({ field: name, value }))
  }

  // Calculate tax when inputs change
  useEffect(() => {
    dispatch(calculateTaxResult())
  }, [taxData.income, taxData.taxRate, dispatch])

  // Format currency in VND
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount)
  }

  return (
    <div className="calculator-container">
      <h2>Tính thuế thu nhập</h2>

      <div className="calculator-form">
        <div className="form-group">
          <label htmlFor="income">Thu nhập (VND)</label>
          <input
            type="number"
            id="income"
            name="income"
            value={taxData.income}
            onChange={handleInputChange}
            min="0"
            step="1000000"
            className="calculator-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="taxRate">Thuế suất (%)</label>
          <input
            type="number"
            id="taxRate"
            name="taxRate"
            value={taxData.taxRate}
            onChange={handleInputChange}
            min="0"
            max="100"
            className="calculator-input"
          />
        </div>
      </div>

      {taxData.result !== null && (
        <div className="calculator-result">
          <div className="result-header">Kết quả</div>
          <div className="result-value">
            <p>
              Thu nhập: <strong>{formatCurrency(taxData.income)}</strong>
            </p>
            <p>
              Thuế suất: <strong>{taxData.taxRate}%</strong>
            </p>
            <p>
              Thuế phải nộp: <strong>{formatCurrency(taxData.result)}</strong>
            </p>
            <p>
              Thu nhập sau thuế: <strong>{formatCurrency(taxData.income - taxData.result)}</strong>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
