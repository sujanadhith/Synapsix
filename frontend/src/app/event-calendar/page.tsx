"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type EventData = {
  eventName?: string;
  eventType?: string;
  date?: string;
  venue?: string;
  capacity?: string;
};

export default function EventCalendarPage() {
  const router = useRouter();
  const [eventData, setEventData] = useState<EventData>({});
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const savedEvent = localStorage.getItem("eventiq-current-event");

    if (savedEvent) {
      try {
        const parsed = JSON.parse(savedEvent);
        setEventData(parsed);

        if (parsed.date) {
          const [year, month, day] = parsed.date.split("-").map(Number);
          setCurrentDate(new Date(year, month - 1, day));
        }
      } catch (error) {
        console.error("Unable to load event:", error);
      }
    }
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  const calendarDays = useMemo(() => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const days: (number | null)[] = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  }, [year, month]);

  const eventDay = eventData.date
    ? Number(eventData.date.split("-")[2])
    : null;

  const eventMonth = eventData.date
    ? Number(eventData.date.split("-")[1]) - 1
    : null;

  const eventYear = eventData.date
    ? Number(eventData.date.split("-")[0])
    : null;

  const isEventMonth =
    eventMonth === month && eventYear === year;

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const goToday = () => {
    setCurrentDate(new Date());
  };

  const formatEventDate = () => {
    if (!eventData.date) return "Date not selected";

    const [y, m, d] = eventData.date.split("-").map(Number);

    return new Date(y, m - 1, d).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <main className="min-h-screen bg-[#f6f8fc] flex text-gray-900">
      {/* SIDEBAR */}
      <aside className="w-[270px] min-h-screen bg-[#091120] text-white p-6 fixed left-0 top-0">
        <div className="mb-10">
          <h1 className="text-2xl font-bold">
            EventIQ <span className="text-blue-500">AI</span>
          </h1>

          <p className="text-gray-400 text-sm mt-2">
            Organizer Intelligence
          </p>
        </div>

        <nav className="space-y-2">
          <button
            onClick={() => router.push("/dashboard")}
            className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-800"
          >
            Dashboard
          </button>

          <button
            onClick={() => router.push("/create-event")}
            className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-800"
          >
            Create Event
          </button>

          <button
            onClick={() => router.push("/ai-chatbot")}
            className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-800"
          >
            AI Chatbot
          </button>

          <button
            onClick={() => router.push("/ai-description")}
            className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-800"
          >
            AI Description
          </button>

          <button
            onClick={() => router.push("/target-students")}
            className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-800"
          >
            Target Students
          </button>

          <button
            onClick={() => router.push("/promotion-strategy")}
            className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-800"
          >
            Promotion Strategy
          </button>

          <button
            onClick={() => router.push("/budget-planner")}
            className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-800"
          >
            Budget Planner
          </button>

          <button className="w-full text-left px-4 py-3 rounded-xl bg-blue-600 font-semibold">
            Event Calendar
          </button>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <section className="ml-[270px] flex-1 p-10">
        <div className="max-w-7xl mx-auto">
          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 mb-8">
            <div>
              <p className="text-blue-600 text-sm font-semibold">
                EVENT MANAGEMENT
              </p>

              <h1 className="text-3xl font-bold mt-2">
                Event Calendar
              </h1>

              <p className="text-gray-600 mt-2">
                Track your events, promotion schedule and important dates.
              </p>
            </div>

            <button
              onClick={() => router.push("/create-event")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 h-12 rounded-xl font-semibold"
            >
              + Create Event
            </button>
          </div>

          {/* SUMMARY CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-7">
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <p className="text-gray-500 text-sm">
                Current Event
              </p>

              <h3 className="font-bold text-xl mt-2">
                {eventData.eventName || "No event"}
              </h3>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <p className="text-gray-500 text-sm">
                Event Date
              </p>

              <h3 className="font-bold text-xl mt-2">
                {formatEventDate()}
              </h3>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <p className="text-gray-500 text-sm">
                Venue
              </p>

              <h3 className="font-bold text-xl mt-2">
                {eventData.venue || "Not selected"}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6">
            {/* CALENDAR */}
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
              {/* CALENDAR HEADER */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div>
                  <h2 className="text-2xl font-bold">
                    {monthName}
                  </h2>

                  <p className="text-gray-500 text-sm mt-1">
                    Monthly event schedule
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={goToday}
                    className="px-4 h-10 border border-gray-300 rounded-lg font-semibold hover:bg-gray-100"
                  >
                    Today
                  </button>

                  <button
                    onClick={previousMonth}
                    className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-100"
                  >
                    ←
                  </button>

                  <button
                    onClick={nextMonth}
                    className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-100"
                  >
                    →
                  </button>
                </div>
              </div>

              {/* WEEK DAYS */}
              <div className="grid grid-cols-7 border-b border-gray-200 bg-gray-50">
                {[
                  "Sun",
                  "Mon",
                  "Tue",
                  "Wed",
                  "Thu",
                  "Fri",
                  "Sat",
                ].map((day) => (
                  <div
                    key={day}
                    className="text-center py-4 text-sm font-semibold text-gray-500"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* DAYS */}
              <div className="grid grid-cols-7">
                {calendarDays.map((day, index) => {
                  const isEventDay =
                    day !== null &&
                    isEventMonth &&
                    day === eventDay;

                  return (
                    <div
                      key={index}
                      className={`min-h-[115px] border-r border-b border-gray-100 p-3 ${
                        isEventDay
                          ? "bg-blue-50"
                          : "bg-white"
                      }`}
                    >
                      {day && (
                        <>
                          <div
                            className={`w-8 h-8 flex items-center justify-center rounded-full text-sm ${
                              isEventDay
                                ? "bg-blue-600 text-white font-bold"
                                : "text-gray-700"
                            }`}
                          >
                            {day}
                          </div>

                          {isEventDay && (
                            <div className="mt-2 bg-blue-600 text-white rounded-lg p-2">
                              <p className="text-xs font-bold truncate">
                                {eventData.eventName}
                              </p>

                              <p className="text-[10px] text-blue-100 mt-1 truncate">
                                {eventData.venue ||
                                  "Event"}
                              </p>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="space-y-6">
              {/* UPCOMING EVENT */}
              <div className="bg-[#091120] text-white rounded-2xl p-6">
                <p className="text-blue-400 text-xs font-semibold">
                  UPCOMING EVENT
                </p>

                <h3 className="text-xl font-bold mt-3">
                  {eventData.eventName ||
                    "No event selected"}
                </h3>

                <p className="text-gray-400 mt-3">
                  {formatEventDate()}
                </p>

                {eventData.venue && (
                  <p className="text-gray-400 mt-1">
                    {eventData.venue}
                  </p>
                )}

                {eventData.capacity && (
                  <p className="text-gray-400 mt-1">
                    Expected Capacity:{" "}
                    {eventData.capacity}
                  </p>
                )}

                <button
                  onClick={() =>
                    router.push("/ai-chatbot")
                  }
                  className="w-full bg-blue-600 hover:bg-blue-700 h-11 rounded-xl font-semibold mt-6"
                >
                  Ask AI About Event
                </button>
              </div>

              {/* AI REMINDERS */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                    AI
                  </div>

                  <div>
                    <p className="text-xs text-blue-600 font-semibold">
                      EVENTIQ AI
                    </p>

                    <h3 className="font-bold">
                      Smart Reminders
                    </h3>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <p className="font-semibold">
                      Start Promotion
                    </p>

                    <p className="text-gray-500 text-sm mt-1">
                      Begin your main campaign 5–7
                      days before the event.
                    </p>
                  </div>

                  <div className="border-l-4 border-orange-400 pl-4">
                    <p className="font-semibold">
                      Registration Reminder
                    </p>

                    <p className="text-gray-500 text-sm mt-1">
                      Send a final reminder 1–2 days
                      before registrations close.
                    </p>
                  </div>

                  <div className="border-l-4 border-green-500 pl-4">
                    <p className="font-semibold">
                      Event Day
                    </p>

                    <p className="text-gray-500 text-sm mt-1">
                      Confirm venue, volunteers and
                      event resources.
                    </p>
                  </div>
                </div>
              </div>

              {/* QUICK ACTIONS */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-4">
                  Quick Actions
                </h3>

                <div className="space-y-3">
                  <button
                    onClick={() =>
                      router.push(
                        "/promotion-strategy"
                      )
                    }
                    className="w-full text-left bg-gray-50 hover:bg-gray-100 rounded-xl p-4 font-semibold"
                  >
                    View Promotion Plan →
                  </button>

                  <button
                    onClick={() =>
                      router.push(
                        "/budget-planner"
                      )
                    }
                    className="w-full text-left bg-gray-50 hover:bg-gray-100 rounded-xl p-4 font-semibold"
                  >
                    View Budget →
                  </button>

                  <button
                    onClick={() =>
                      router.push("/dashboard")
                    }
                    className="w-full text-left bg-gray-50 hover:bg-gray-100 rounded-xl p-4 font-semibold"
                  >
                    View Analytics →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() =>
                router.push("/budget-planner")
              }
              className="px-6 h-12 bg-white border border-gray-300 rounded-xl font-semibold hover:bg-gray-100"
            >
              ← Budget Planner
            </button>

            <button
              onClick={() =>
                router.push("/dashboard")
              }
              className="px-8 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold"
            >
              View Smart Dashboard →
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}