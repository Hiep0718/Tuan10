"use client"

import { useState } from "react"
import { BMICalculator } from "./BMICalculator"
import { TaxCalculator } from "./TaxCalculator"

export function Calculators() {
  const [activeCalculator, setActiveCalculator] = useState("bmi")

  return (
    <div className="calculators-container">
      <div className="calculator-tabs">
        <button
          className={`calculator-tab ${activeCalculator === "bmi" ? "active" : ""}`}
          onClick={() => setActiveCalculator("bmi")}
        >
          Tính BMI
        </button>
        <button
          className={`calculator-tab ${activeCalculator === "tax" ? "active" : ""}`}
          onClick={() => setActiveCalculator("tax")}
        >
          Tính Thuế
        </button>
      </div>

      <div className="calculator-content">{activeCalculator === "bmi" ? <BMICalculator /> : <TaxCalculator />}</div>
    </div>
  )
}
