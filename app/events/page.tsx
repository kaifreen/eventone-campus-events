import Navbar from "@/components/Navbar";
import EventList from "@/components/EventList";

export default function EventsPage() {
  return (
    <>
      <Navbar />
      <main className="container">
        <section className="events-section all-events-page">
          <div className="section-heading">
            <div>
              <h2>All Events</h2>
              <p>Browse every event available on campus.</p>
            </div>
          </div>
          <EventList />
        </section>
      </main>
    </>
  );
}
