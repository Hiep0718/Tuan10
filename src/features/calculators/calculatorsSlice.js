import { createSlice } from "@reduxjs/toolkit"

// Initial state for calculators
const initialState = {
  bmi: {
    height: 170, // cm
    weight: 70, // kg
    result: null,
    category: null,
  },
  tax: {
    income: 10000000, // VND
    taxRate: 10, // %
    result: null,
  },
}

// Helper functions for calculations
const calculateBMI = (height, weight) => {
  // Convert height from cm to m
  const heightInMeters = height / 100
  // Calculate BMI: weight (kg) / height^2 (m)
  const bmi = weight / (heightInMeters * heightInMeters)
  return Number.parseFloat(bmi.toFixed(1))
}

const getBMICategory = (bmi) => {
  if (bmi < 18.5) return { category: "Thiếu cân", color: "blue" }
  if (bmi < 25) return { category: "Bình thường", color: "green" }
  if (bmi < 30) return { category: "Thừa cân", color: "orange" }
  return { category: "Béo phì", color: "red" }
}

const calculateTax = (income, taxRate) => {
  return (income * taxRate) / 100
}

// Create the calculators slice
export const calculatorsSlice = createSlice({
  name: "calculators",
  initialState,
  reducers: {
    // Update BMI inputs
    updateBMIInput: (state, action) => {
      const { field, value } = action.payload
      state.bmi[field] = Number(value)
    },
    // Calculate BMI result
    calculateBMIResult: (state) => {
      const { height, weight } = state.bmi
      const bmiValue = calculateBMI(height, weight)
      const { category, color } = getBMICategory(bmiValue)

      state.bmi.result = bmiValue
      state.bmi.category = category
      state.bmi.color = color
    },
    // Update Tax inputs
    updateTaxInput: (state, action) => {
      const { field, value } = action.payload
      state.tax[field] = Number(value)
    },
    // Calculate Tax result
    calculateTaxResult: (state) => {
      const { income, taxRate } = state.tax
      state.tax.result = calculateTax(income, taxRate)
    },
  },
})

// Export actions
export const { updateBMIInput, calculateBMIResult, updateTaxInput, calculateTaxResult } = calculatorsSlice.actions

// Export selectors
export const selectBMIData = (state) => state.calculators.bmi
export const selectTaxData = (state) => state.calculators.tax

export default calculatorsSlice.reducer
