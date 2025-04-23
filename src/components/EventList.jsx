"use client"

import { useSelector, useDispatch } from "react-redux"
import { selectEvents, openAddForm, openEditForm, deleteEvent } from "../features/events/eventsSlice"

export function EventList() {
  const events = useSelector(selectEvents)
  const dispatch = useDispatch()

  const handleAddEvent = () => {
    dispatch(openAddForm())
  }

  const handleEditEvent = (eventId) => {
    dispatch(openEditForm(eventId))
  }

  const handleDeleteEvent = (eventId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sự kiện này không?")) {
      dispatch(deleteEvent(eventId))
    }
  }

  // Group events by month and year
  const groupedEvents = events.reduce((groups, event) => {
    const date = new Date(event.date)
    const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`

    if (!groups[monthYear]) {
      groups[monthYear] = []
    }

    groups[monthYear].push(event)
    return groups
  }, {})

  // Sort events by date
  Object.keys(groupedEvents).forEach((monthYear) => {
    groupedEvents[monthYear].sort((a, b) => new Date(a.date) - new Date(b.date))
  })

  // Sort month-year groups
  const sortedMonthYears = Object.keys(groupedEvents).sort((a, b) => {
    const [monthA, yearA] = a.split("-").map(Number)
    const [monthB, yearB] = b.split("-").map(Number)

    if (yearA !== yearB) return yearA - yearB
    return monthA - monthB
  })

  return (
    <div className="event-list-container">
      <div className="event-list-header">
        <h2>Danh sách sự kiện</h2>
        <button className="add-event-button" onClick={handleAddEvent}>
          Thêm sự kiện mới
        </button>
      </div>

      {events.length === 0 ? (
        <div className="no-events">
          <p>Chưa có sự kiện nào. Hãy thêm sự kiện mới!</p>
        </div>
      ) : (
        <div className="events-timeline">
          {sortedMonthYears.map((monthYear) => {
            const [month, year] = monthYear.split("-").map(Number)
            const monthName = new Date(year, month - 1).toLocaleString("vi", { month: "long" })

            return (
              <div key={monthYear} className="month-group">
                <div className="month-header">
                  <h3>
                    {monthName} {year}
                  </h3>
                </div>

                <div className="events-in-month">
                  {groupedEvents[monthYear].map((event) => (
                    <div key={event.id} className="event-card">
                      <div className="event-date">
                        <div className="event-day">{new Date(event.date).getDate()}</div>
                        <div className="event-month">
                          {new Date(event.date).toLocaleString("vi", { month: "short" })}
                        </div>
                      </div>

                      <div className="event-details">
                        <h3 className="event-title">{event.title}</h3>
                        <div className="event-meta">
                          <span className="event-time">{event.time}</span>
                          <span className="event-location">{event.location}</span>
                        </div>
                        <p className="event-description">{event.description}</p>
                        {event.category && <span className="event-category">{event.category}</span>}
                      </div>

                      <div className="event-actions">
                        <button
                          className="edit-event-button"
                          onClick={() => handleEditEvent(event.id)}
                          aria-label="Chỉnh sửa sự kiện"
                        >
                          ✏️
                        </button>
                        <button
                          className="delete-event-button"
                          onClick={() => handleDeleteEvent(event.id)}
                          aria-label="Xóa sự kiện"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
