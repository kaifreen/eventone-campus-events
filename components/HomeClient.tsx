"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronDown, MapPin, Search } from "lucide-react";
import CategoryFilter from "./CategoryFilter";
import EventCard from "./EventCard";
import type { EventItem, EventCategory } from "@/types/event";

interface EventApiResponse {
  site: {
    name: string;
    tagline: string;
    heroTitle: string;
    heroText: string;
    heroImage: string;
  };
  stats: {
    eventsThisSemester: string;
    studentsJoined: string;
  };
  categories: EventCategory[];
  events: EventItem[];
}

export default function HomeClient() {
  const [data, setData] = useState<EventApiResponse | null>(null);
  const [category, setCategory] = useState<EventCategory | "All">("All");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadEvents() {
      try {
        const response = await fetch("/api/events", { cache: "no-store" });

        if (!response.ok) {
          throw new Error("Failed to load events");
        }

        const json = (await response.json()) as EventApiResponse;
        setData(json);
      } catch {
        setError("Unable to load events. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, []);

  const filteredEvents = useMemo(() => {
    if (!data) return [];

    return data.events.filter((event) => {
      const matchesCategory =
        category === "All" || event.category === category;

      const q = query.trim().toLowerCase();

      const matchesQuery =
        !q ||
        event.title.toLowerCase().includes(q) ||
        event.description.toLowerCase().includes(q) ||
        event.tags.some((tag) => tag.toLowerCase().includes(q));

      return matchesCategory && matchesQuery;
    });
  }, [data, category, query]);

  if (loading) {
    return <div className="loading">Loading events...</div>;
  }

  if (error || !data) {
    return <div className="empty">{error || "No data available."}</div>;
  }

  const featured = data.events.filter((event) => event.featured).slice(0, 4);

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">{data.site.tagline}</p>
          <h1>{data.site.heroTitle}</h1>
          <p className="hero-text">{data.site.heroText}</p>

          <div className="search-box">
            <Search size={20} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search events, topics or organisers..."
            />
            <div className="location-select">
              <MapPin size={17} />
              All Locations
              <ChevronDown size={16} />
            </div>
            <button aria-label="Search">
              <ArrowRight size={21} />
            </button>
          </div>

          <CategoryFilter
            categories={data.categories}
            selected={category}
            onSelect={setCategory}
          />
        </div>

        <div className="hero-visual">
          <Image
            src={data.site.heroImage}
            alt="Campus events"
            fill
            priority
            className="hero-image"
            sizes="(max-width: 900px) 100vw, 45vw"
          />

          <div className="hero-stat stat-one">
            <strong>{data.stats.eventsThisSemester}</strong>
            <span>Events this semester</span>
          </div>

          <div className="hero-stat stat-two">
            <strong>{data.stats.studentsJoined}</strong>
            <span>Students joined</span>
          </div>

          <div className="create-bubble">
            Create<br />Your Event →
          </div>
        </div>
      </section>

      <section id="events" className="events-section">
        <div className="section-heading">
          <div>
            <h2>Upcoming Events</h2>
            <p>Explore the latest events happening on campus. Don&apos;t miss out!</p>
          </div>

          <Link href="/events" className="view-all">
            View All Events <ArrowRight size={16} />
          </Link>
        </div>

        <div className="event-grid">
          {(query || category !== "All" ? filteredEvents : featured).map(
            (event) => (
              <EventCard key={event.id} event={event} />
            )
          )}
        </div>

        {filteredEvents.length === 0 && (
          <div className="empty">
            No events found. Try another search or category.
          </div>
        )}
      </section>
    </>
  );
}
