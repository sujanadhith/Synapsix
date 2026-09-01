"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateEventPage() {
  const router = useRouter();

  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [capacity, setCapacity] = useState("");
  const [description, setDescription] = useState("");

  const handleAskAI = () => {
    const eventData = {
      eventName,
      eventType,
      date,
      venue,
      capacity,
      description,
    };

    localStorage.setItem(
      "eventiq-current-event",
      JSON.stringify(eventData)
    );

    router.push("/ai-chatbot");
  };

  return (
    <main className="min-h-screen bg-[#f5f7fb] flex">
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

        <nav className="space-y-3">
          <button
            onClick={() => router.push("/dashboard")}
            className="w-full text-left px-4 py-4 rounded-xl hover:bg-gray-800 transition"
          >
            Dashboard
          </button>

          <button className="w-full text-left px-4 py-4 rounded-xl bg-blue-600 font-semibold">
            Create Event
          </button>

          <button
            onClick={() => router.push("/ai-chatbot")}
            className="w-full text-left px-4 py-4 rounded-xl hover:bg-gray-800 transition"
          >
            AI Chatbot
          </button>

          <button
            onClick={() => router.push("/ai-description")}
            className="w-full text-left px-4 py-4 rounded-xl hover:bg-gray-800 transition"
          >
            AI Description
          </button>

          <button
            onClick={() => router.push("/target-students")}
            className="w-full text-left px-4 py-4 rounded-xl hover:bg-gray-800 transition"
          >
            Target Students
          </button>

          <button
            onClick={() => router.push("/promotion-strategy")}
            className="w-full text-left px-4 py-4 rounded-xl hover:bg-gray-800 transition"
          >
            Promotion Strategy
          </button>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <section className="ml-[270px] w-[calc(100%-270px)] px-12 py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            Create Event
          </h1>

          <p className="text-gray-600 mt-2">
            Enter your event details and let EventIQ AI help you improve it.
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-8 max-w-5xl shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* EVENT NAME */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Event Name
              </label>

              <input
                type="text"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="Example: AI Hackathon 2026"
                className="w-full h-14 px-4 border border-gray-300 rounded-xl text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* EVENT TYPE */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Event Type
              </label>

              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full h-14 px-4 border border-gray-300 rounded-xl bg-white text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">Select event type</option>
                <option value="Hackathon">Hackathon</option>
                <option value="Workshop">Workshop</option>
                <option value="Technical Event">Technical Event</option>
                <option value="Cultural Event">Cultural Event</option>
                <option value="Seminar">Seminar</option>
                <option value="Competition">Competition</option>
                <option value="Sports Event">Sports Event</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* DATE */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Event Date
              </label>

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full h-14 px-4 border border-gray-300 rounded-xl text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* VENUE */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Venue
              </label>

              <input
                type="text"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                placeholder="Example: Main Auditorium"
                className="w-full h-14 px-4 border border-gray-300 rounded-xl text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* CAPACITY */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Expected Capacity
              </label>

              <input
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                placeholder="Example: 300"
                className="w-full h-14 px-4 border border-gray-300 rounded-xl text-gray-900 placeholder:text-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Event Description
            </label>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Briefly describe your event, its purpose and what students can expect..."
              rows={6}
              className="w-full p-4 border border-gray-300 rounded-xl text-gray-900 placeholder:text-gray-400 outline-none resize-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* AI INFO */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mt-6">
            <h3 className="font-semibold text-blue-700">
              EventIQ AI Assistant
            </h3>

            <p className="text-gray-700 text-sm mt-2 leading-6">
              After entering your event details, EventIQ AI can improve the
              description, identify target students, suggest promotion
              strategies and predict engagement.
            </p>
          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="h-12 px-7 border border-gray-300 bg-white text-gray-800 rounded-xl font-semibold hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleAskAI}
              className="h-12 px-8 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition"
            >
              Create & Ask AI →
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}