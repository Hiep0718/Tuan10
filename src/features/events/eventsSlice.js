import { createSlice } from "@reduxjs/toolkit"

// Initial state with some sample events
const initialState = {
  events: [
    {
      id: "1",
      title: "Hội nghị công nghệ 2023",
      description: "Hội nghị về các xu hướng công nghệ mới nhất",
      date: "2023-12-15",
      time: "09:00",
      location: "Trung tâm Hội nghị Quốc gia, Hà Nội",
      category: "Công nghệ",
    },
    {
      id: "2",
      title: "Workshop UX/UI Design",
      description: "Học hỏi các kỹ năng thiết kế UX/UI từ chuyên gia",
      date: "2023-12-20",
      time: "14:00",
      location: "WeWork Tòa nhà Lim, TP.HCM",
      category: "Thiết kế",
    },
  ],
  isFormOpen: false,
  editingEvent: null,
}

export const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    // Add a new event
    addEvent: (state, action) => {
      const newEvent = {
        ...action.payload,
        id: Date.now().toString(),
      }
      state.events.push(newEvent)
    },

    // Edit an existing event
    editEvent: (state, action) => {
      const index = state.events.findIndex((event) => event.id === action.payload.id)
      if (index !== -1) {
        state.events[index] = action.payload
      }
    },

    // Delete an event
    deleteEvent: (state, action) => {
      state.events = state.events.filter((event) => event.id !== action.payload)
    },

    // Open form for adding a new event
    openAddForm: (state) => {
      state.isFormOpen = true
      state.editingEvent = null
    },

    // Open form for editing an existing event
    openEditForm: (state, action) => {
      state.isFormOpen = true
      state.editingEvent = state.events.find((event) => event.id === action.payload)
    },

    // Close the form
    closeForm: (state) => {
      state.isFormOpen = false
      state.editingEvent = null
    },
  },
})

// Export actions
export const { addEvent, editEvent, deleteEvent, openAddForm, openEditForm, closeForm } = eventsSlice.actions

// Export selectors
export const selectEvents = (state) => state.events.events
export const selectIsFormOpen = (state) => state.events.isFormOpen
export const selectEditingEvent = (state) => state.events.editingEvent

export default eventsSlice.reducer
