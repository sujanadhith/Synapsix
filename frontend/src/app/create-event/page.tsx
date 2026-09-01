"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";

export default function CreateEventPage() {
  const router = useRouter();

  const [eventName, setEventName] = useState("");
  const [eventType, setEventType] = useState("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [capacity, setCapacity] = useState("");
  const [description, setDescription] = useState("");

  const [success, setSuccess] = useState(false);

  const createEvent = () => {
    if (!eventName.trim()) {
      alert("Please enter the event name.");
      return;
    }

    if (!eventType) {
      alert("Please select the event type.");
      return;
    }

    if (!date) {
      alert("Please select the event date.");
      return;
    }

    if (!capacity) {
      alert("Please enter the expected number of students.");
      return;
    }

    const eventData = {
      eventName,
      eventType,
      date,
      venue,
      capacity,
      description,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "eventiq-current-event",
      JSON.stringify(eventData)
    );

    setSuccess(true);
  };

  const resetForm = () => {
    setEventName("");
    setEventType("");
    setDate("");
    setVenue("");
    setCapacity("");
    setDescription("");
    setSuccess(false);
  };

  return (
    <main className="min-h-screen bg-[#f6f8fc] flex text-gray-900">
      {/* COMMON SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <section className="ml-[270px] flex-1 p-8 lg:p-10">
        <div className="max-w-7xl mx-auto">
          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <p className="text-blue-600 text-sm font-semibold">
                EVENT MANAGEMENT
              </p>

              <h1 className="text-3xl font-bold mt-2">
                Create Event
              </h1>

              <p className="text-gray-600 mt-2">
                Enter your event details and let EventIQ help you plan,
                promote and improve participation.
              </p>
            </div>

            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="h-12 px-6 bg-white border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition"
            >
              Back to Dashboard
            </button>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6">
            {/* FORM */}
            <div className="bg-white border border-gray-200 rounded-2xl p-7">
              <div className="mb-7">
                <h2 className="text-xl font-bold">
                  Event Information
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                  Provide the basic information about your event.
                </p>
              </div>

              <div className="space-y-6">
                {/* EVENT NAME */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Event Name
                  </label>

                  <input
                    type="text"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    placeholder="Example: AI Innovation Hackathon"
                    className="w-full h-14 px-4 border border-gray-300 rounded-xl bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* TYPE + DATE */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Event Type
                    </label>

                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="w-full h-14 px-4 border border-gray-300 rounded-xl bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    >
                      <option value="">
                        Select event type
                      </option>

                      <option value="Hackathon">
                        Hackathon
                      </option>

                      <option value="Workshop">
                        Workshop
                      </option>

                      <option value="Technical Event">
                        Technical Event
                      </option>

                      <option value="Seminar">
                        Seminar
                      </option>

                      <option value="Conference">
                        Conference
                      </option>

                      <option value="Cultural Event">
                        Cultural Event
                      </option>

                      <option value="Sports Event">
                        Sports Event
                      </option>

                      <option value="Competition">
                        Competition
                      </option>

                      <option value="Other">
                        Other
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Event Date
                    </label>

                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full h-14 px-4 border border-gray-300 rounded-xl bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>

                {/* VENUE + CAPACITY */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Venue
                    </label>

                    <input
                      type="text"
                      value={venue}
                      onChange={(e) => setVenue(e.target.value)}
                      placeholder="Example: Main Auditorium"
                      className="w-full h-14 px-4 border border-gray-300 rounded-xl bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Expected Students
                    </label>

                    <input
                      type="number"
                      min="1"
                      value={capacity}
                      onChange={(e) => setCapacity(e.target.value)}
                      placeholder="Example: 300"
                      className="w-full h-14 px-4 border border-gray-300 rounded-xl bg-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>

                {/* DESCRIPTION */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-semibold">
                      Event Description
                    </label>

                    <span className="text-xs text-gray-400">
                      {description.length}/500
                    </span>
                  </div>

                  <textarea
                    value={description}
                    maxLength={500}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your event, its purpose, activities and benefits for students..."
                    className="w-full min-h-[170px] p-4 border border-gray-300 rounded-xl bg-white resize-none outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* BUTTONS */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="button"
                    onClick={createEvent}
                    className="flex-1 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition"
                  >
                    Create Event
                  </button>

                  <button
                    type="button"
                    onClick={resetForm}
                    className="h-14 px-8 border border-gray-300 bg-white hover:bg-gray-50 rounded-xl font-semibold transition"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="space-y-6">
              {/* AI INFO */}
              <div className="bg-[#091120] text-white rounded-2xl p-6">
                <div className="w-11 h-11 bg-blue-600 rounded-xl flex items-center justify-center font-bold">
                  AI
                </div>

                <h3 className="text-xl font-bold mt-5">
                  EventIQ Intelligence
                </h3>

                <p className="text-gray-400 mt-3 text-sm leading-6">
                  Once you create an event, EventIQ can use these details
                  across your organizer tools.
                </p>

                <div className="space-y-3 mt-6">
                  <div className="bg-white/5 rounded-xl p-3">
                    <p className="text-sm">
                      Improve event descriptions
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-3">
                    <p className="text-sm">
                      Identify target students
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-3">
                    <p className="text-sm">
                      Generate promotion strategies
                    </p>
                  </div>

                  <div className="bg-white/5 rounded-xl p-3">
                    <p className="text-sm">
                      Predict expected engagement
                    </p>
                  </div>
                </div>
              </div>

              {/* EVENT PREVIEW */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <p className="text-blue-600 text-xs font-semibold">
                  LIVE PREVIEW
                </p>

                <h3 className="text-xl font-bold mt-3">
                  {eventName || "Your Event Name"}
                </h3>

                <div className="space-y-3 mt-5 text-sm">
                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">
                      Type
                    </span>

                    <span className="font-semibold text-right">
                      {eventType || "Not selected"}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">
                      Date
                    </span>

                    <span className="font-semibold text-right">
                      {date || "Not selected"}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">
                      Venue
                    </span>

                    <span className="font-semibold text-right">
                      {venue || "Not entered"}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4">
                    <span className="text-gray-500">
                      Capacity
                    </span>

                    <span className="font-semibold text-right">
                      {capacity
                        ? `${capacity} Students`
                        : "Not entered"}
                    </span>
                  </div>
                </div>
              </div>

              {/* TIP */}
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
                <p className="text-blue-700 font-semibold">
                  EventIQ Tip
                </p>

                <p className="text-gray-600 text-sm leading-6 mt-2">
                  Add a clear event description and realistic expected
                  capacity. This information helps produce better audience,
                  promotion and logistics recommendations.
                </p>
              </div>
            </div>
          </div>

          {/* SUCCESS */}
          {success && (
            <div className="mt-7 bg-green-50 border border-green-200 rounded-2xl p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                <div>
                  <p className="text-green-700 font-bold text-lg">
                    Event created successfully!
                  </p>

                  <p className="text-gray-600 text-sm mt-1">
                    Your event is now available to the EventIQ organizer
                    tools.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => router.push("/ai-description")}
                    className="px-5 h-11 bg-white border border-green-200 text-green-700 rounded-xl font-semibold"
                  >
                    Improve Description
                  </button>

                  <button
                    onClick={() => router.push("/target-students")}
                    className="px-5 h-11 bg-white border border-green-200 text-green-700 rounded-xl font-semibold"
                  >
                    Find Audience
                  </button>

                  <button
                    onClick={() => router.push("/dashboard")}
                    className="px-5 h-11 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold"
                  >
                    Dashboard →
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}