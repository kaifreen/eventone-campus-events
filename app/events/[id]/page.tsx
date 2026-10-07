import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, MapPin, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";

async function getEvent(id: string) {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const response = await fetch(`${baseUrl}/api/events/${id}`, {
    cache: "no-store"
  });

  if (!response.ok) return null;

  return response.json();
}

export default async function EventDetailsPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await getEvent(id);

  if (!event) notFound();

  return (
    <>
      <Navbar />

      <main className="container detail-page">
        <Link href="/" className="back-link">
          <ArrowLeft size={17} /> Back to events
        </Link>

        <div className="detail-grid">
          <div className="detail-image">
            <Image
              src={event.image}
              alt={event.title}
              fill
              sizes="(max-width: 900px) 100vw, 55vw"
            />
          </div>

          <div className="detail-content">
            <span className="mini-category">{event.category}</span>
            <h1>{event.title}</h1>
            <p>{event.description}</p>

            <div className="detail-meta">
              <div>
                <CalendarDays />
                <span>
                  {event.date}
                  <small>{event.time}</small>
                </span>
              </div>

              <div>
                <MapPin />
                <span>
                  {event.location}
                  <small>Organised by {event.organizer}</small>
                </span>
              </div>
            </div>

            <div className="tags">
              {event.tags.map((tag: string) => (
                <span key={tag}>#{tag}</span>
              ))}
            </div>

            <button className="primary-btn">Register for Event</button>
          </div>
        </div>
      </main>
    </>
  );
}
