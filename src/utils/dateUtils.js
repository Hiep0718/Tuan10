// Format date to display in a readable format
export const formatDate = (dateString) => {
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("vi-VN", options)
  }
  
  // Format time from 24h to 12h format
  export const formatTime = (timeString) => {
    if (!timeString) return ""
  
    const [hours, minutes] = timeString.split(":")
    const hour = Number.parseInt(hours, 10)
    const ampm = hour >= 12 ? "PM" : "AM"
    const hour12 = hour % 12 || 12
  
    return `${hour12}:${minutes} ${ampm}`
  }
  