import { useEffect, useState } from "react";

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
  
    setEvents([
      {
        id: 1,
        title: "Food Drive at Central Park",
        date: "2025-08-20",
        location: "Dhaka, Bangladesh",
      },
      {
        id: 2,
        title: "Community Kitchen Service",
        date: "2025-08-25",
        location: "Chittagong, Bangladesh",
      },
    ]);
  }, []);

  return (
    <section className="py-12 bg-base-100">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl text-green-700 font-bold mb-6">📅 Upcoming Events</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="p-6 bg-base-200 rounded-xl shadow-md"
            >
              <h3 className="text-xl font-semibold">{event.title}</h3>
              <p className="mt-2">📍 {event.location}</p>
              <p className="text-sm text-gray-500">🗓 {event.date}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
