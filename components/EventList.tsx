"use client";

import { useEffect, useState } from "react";
import EventCard from "./EventCard";
import type { EventItem } from "@/types/event";

export default function EventList() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/events", { cache: "no-store" })
      .then((response) => response.json())
      .then((data) => setEvents(data.events))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Loading events...</div>;

  return (
    <div className="event-grid">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}
