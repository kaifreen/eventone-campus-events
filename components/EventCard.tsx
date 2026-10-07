import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, Heart } from "lucide-react";
import type { EventItem } from "@/types/event";

export default function EventCard({ event }: { event: EventItem }) {
  return (
    <article className="event-card">
      <div className="event-image-wrap">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="event-image"
          sizes="(max-width: 900px) 100vw, 25vw"
        />
        <span className={`status ${event.status.toLowerCase()}`}>{event.status}</span>
        <button className="heart" aria-label={`Save ${event.title}`}>
          <Heart size={17} />
        </button>
      </div>

      <div className="event-card-body">
        <span className="mini-category">{event.category}</span>
        <h3>{event.title}</h3>

        <div className="meta">
          <span><CalendarDays size={14} /> {event.date}</span>
          <span><MapPin size={14} /> {event.location}</span>
        </div>

        <div className="card-bottom">
          <span className="attendees">● ● ● +{event.attendees}</span>
          <Link href={`/events/${event.id}`} className="details-btn">
            View Details →
          </Link>
        </div>
      </div>
    </article>
  );
}