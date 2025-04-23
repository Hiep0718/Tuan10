"use client"

import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { addEvent, editEvent, closeForm, selectIsFormOpen, selectEditingEvent } from "../features/events/eventsSlice"

export function EventForm() {
  const dispatch = useDispatch()
  const isFormOpen = useSelector(selectIsFormOpen)
  const editingEvent = useSelector(selectEditingEvent)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "",
  })

  const [errors, setErrors] = useState({})

  // Reset form when opening/closing or switching between add/edit
  useEffect(() => {
    if (isFormOpen) {
      if (editingEvent) {
        setFormData({ ...editingEvent })
      } else {
        // Default values for new event
        setFormData({
          title: "",
          description: "",
          date: new Date().toISOString().split("T")[0], // Today's date
          time: "09:00",
          location: "",
          category: "",
        })
      }
      setErrors({})
    }
  }, [isFormOpen, editingEvent])

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = "Tiêu đề không được để trống"
    }

    if (!formData.date) {
      newErrors.date = "Ngày không được để trống"
    }

    if (!formData.location.trim()) {
      newErrors.location = "Địa điểm không được để trống"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: undefined,
      })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      if (editingEvent) {
        dispatch(editEvent(formData))
      } else {
        dispatch(addEvent(formData))
      }
      dispatch(closeForm())
    }
  }

  const handleCancel = () => {
    dispatch(closeForm())
  }

  if (!isFormOpen) return null

  return (
    <div className="event-form-overlay">
      <div className="event-form-container">
        <div className="event-form-header">
          <h2>{editingEvent ? "Chỉnh sửa sự kiện" : "Thêm sự kiện mới"}</h2>
          <button className="close-button" onClick={handleCancel} aria-label="Đóng">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="event-form">
          <div className="form-group">
            <label htmlFor="title">Tiêu đề sự kiện *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`form-input ${errors.title ? "input-error" : ""}`}
            />
            {errors.title && <div className="error-message">{errors.title}</div>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">Ngày *</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={`form-input ${errors.date ? "input-error" : ""}`}
              />
              {errors.date && <div className="error-message">{errors.date}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="time">Thời gian</label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="location">Địa điểm *</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className={`form-input ${errors.location ? "input-error" : ""}`}
            />
            {errors.location && <div className="error-message">{errors.location}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="category">Danh mục</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">-- Chọn danh mục --</option>
              <option value="Công nghệ">Công nghệ</option>
              <option value="Kinh doanh">Kinh doanh</option>
              <option value="Giáo dục">Giáo dục</option>
              <option value="Văn hóa">Văn hóa</option>
              <option value="Thể thao">Thể thao</option>
              <option value="Thiết kế">Thiết kế</option>
              <option value="Khác">Khác</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Mô tả</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="form-input"
            ></textarea>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={handleCancel}>
              Hủy
            </button>
            <button type="submit" className="submit-button">
              {editingEvent ? "Cập nhật" : "Thêm sự kiện"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
