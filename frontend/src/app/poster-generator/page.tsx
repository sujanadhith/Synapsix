"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type EventData = {
  eventName?: string;
  eventType?: string;
  date?: string;
  venue?: string;
  capacity?: string;
  description?: string;
};

export default function PosterGeneratorPage() {
  const router = useRouter();

  const [eventData, setEventData] = useState<EventData>({});
  const [theme, setTheme] = useState("Modern Tech");
  const [tagline, setTagline] = useState("");
  const [generated, setGenerated] = useState(false);

  useEffect(() => {
    const savedEvent = localStorage.getItem("eventiq-current-event");

    if (savedEvent) {
      try {
        const parsed = JSON.parse(savedEvent);
        setEventData(parsed);
      } catch {
        console.log("Unable to load event");
      }
    }
  }, []);

  const generatePoster = () => {
    const name = eventData.eventName || "Your Event";

    setTagline(
      `Join ${name} and be part of an exciting experience filled with learning, innovation and participation.`
    );

    setGenerated(true);
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

          <button
            onClick={() => router.push("/event-calendar")}
            className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-800"
          >
            Event Calendar
          </button>

          <button className="w-full text-left px-4 py-3 rounded-xl bg-blue-600 font-semibold">
            Poster Generator
          </button>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <section className="ml-[270px] flex-1 p-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <p className="text-blue-600 font-semibold text-sm">
              AI CREATIVE TOOL
            </p>

            <h1 className="text-3xl font-bold mt-2">
              AI Poster Generator
            </h1>

            <p className="text-gray-600 mt-2">
              Create promotional poster content automatically from your event details.
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[420px_1fr] gap-6">
            {/* SETTINGS */}
            <div className="bg-white border border-gray-200 rounded-2xl p-7">
              <h2 className="text-xl font-bold">
                Poster Settings
              </h2>

              <p className="text-gray-500 text-sm mt-1 mb-6">
                Customize the poster before generating.
              </p>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Event Name
                  </label>

                  <input
                    type="text"
                    value={eventData.eventName || ""}
                    readOnly
                    placeholder="Create an event first"
                    className="w-full h-12 px-4 rounded-xl border border-gray-300 bg-gray-50 text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Poster Theme
                  </label>

                  <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="w-full h-12 px-4 rounded-xl border border-gray-300 bg-white"
                  >
                    <option>Modern Tech</option>
                    <option>Minimal</option>
                    <option>Professional</option>
                    <option>Festival</option>
                    <option>Dark Neon</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Event Type
                  </label>

                  <input
                    type="text"
                    value={eventData.eventType || ""}
                    readOnly
                    className="w-full h-12 px-4 rounded-xl border border-gray-300 bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Date
                  </label>

                  <input
                    type="text"
                    value={eventData.date || ""}
                    readOnly
                    className="w-full h-12 px-4 rounded-xl border border-gray-300 bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Venue
                  </label>

                  <input
                    type="text"
                    value={eventData.venue || ""}
                    readOnly
                    className="w-full h-12 px-4 rounded-xl border border-gray-300 bg-gray-50"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={generatePoster}
                className="w-full mt-7 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold"
              >
                Generate Poster with AI
              </button>
            </div>

            {/* POSTER PREVIEW */}
            <div className="bg-white border border-gray-200 rounded-2xl p-7">
              <div className="flex justify-between items-center mb-5">
                <div>
                  <h2 className="text-xl font-bold">
                    Poster Preview
                  </h2>

                  <p className="text-gray-500 text-sm mt-1">
                    AI-generated event poster layout
                  </p>
                </div>

                <span className="bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-2 rounded-full">
                  {theme}
                </span>
              </div>

              {!generated ? (
                <div className="min-h-[600px] bg-gray-50 rounded-2xl border border-dashed border-gray-300 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold mx-auto">
                      AI
                    </div>

                    <h3 className="font-bold text-xl mt-5">
                      No Poster Generated
                    </h3>

                    <p className="text-gray-500 mt-2">
                      Click Generate Poster with AI to create a preview.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="min-h-[600px] rounded-2xl bg-[#091120] text-white p-12 flex flex-col justify-between">
                  <div>
                    <p className="text-blue-400 font-semibold">
                      EVENTIQ PRESENTS
                    </p>

                    <h1 className="text-5xl font-bold mt-6 max-w-3xl leading-tight">
                      {eventData.eventName || "Your Event"}
                    </h1>

                    <p className="text-xl text-gray-300 mt-5">
                      {eventData.eventType}
                    </p>

                    <p className="text-gray-400 max-w-2xl leading-7 mt-8">
                      {tagline}
                    </p>
                  </div>

                  <div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-white/10 rounded-xl p-4">
                        <p className="text-gray-400 text-sm">Date</p>
                        <p className="font-bold mt-1">
                          {eventData.date || "TBA"}
                        </p>
                      </div>

                      <div className="bg-white/10 rounded-xl p-4">
                        <p className="text-gray-400 text-sm">Venue</p>
                        <p className="font-bold mt-1">
                          {eventData.venue || "TBA"}
                        </p>
                      </div>

                      <div className="bg-white/10 rounded-xl p-4">
                        <p className="text-gray-400 text-sm">Capacity</p>
                        <p className="font-bold mt-1">
                          {eventData.capacity || "Open"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 flex justify-between items-end">
                      <div>
                        <p className="text-blue-400 text-sm font-semibold">
                          REGISTER NOW
                        </p>

                        <p className="text-gray-400 text-sm mt-1">
                          Be part of the experience.
                        </p>
                      </div>

                      <div className="w-24 h-24 bg-white text-black rounded-xl flex items-center justify-center font-bold text-center text-xs p-2">
                        QR CODE
                        <br />
                        PLACEHOLDER
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {generated && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <button
                    type="button"
                    className="h-12 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50"
                  >
                    Regenerate
                  </button>

                  <button
                    type="button"
                    className="h-12 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50"
                  >
                    Edit Content
                  </button>

                  <button
                    type="button"
                    className="h-12 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700"
                  >
                    Save Poster
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}