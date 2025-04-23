"use client"

import { EventList } from "./EventList"
import { EventForm } from "./EventForm"

export function EventManager() {
  return (
    <div className="event-manager-container">
      <EventList />
      <EventForm />
    </div>
  )
}
