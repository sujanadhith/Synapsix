"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type EventData = {
  eventName?: string;
  eventType?: string;
  date?: string;
  venue?: string;
  capacity?: string;
};

type VenueOption = {
  name: string;
  capacity: string;
  estimatedCost: string;
  match: number;
  reason: string;
};

type FoodOption = {
  name: string;
  type: string;
  estimatedCost: string;
  match: number;
  reason: string;
};

export default function VenueFoodFinderPage() {
  const router = useRouter();

  const [eventData, setEventData] = useState<EventData>({});
  const [generated, setGenerated] = useState(false);

  const [venues] = useState<VenueOption[]>([
    {
      name: "Main Auditorium",
      capacity: "300–500 Students",
      estimatedCost: "₹15,000 – ₹25,000",
      match: 94,
      reason:
        "Best fit for large technical events, hackathons, seminars and formal college programs.",
    },
    {
      name: "Seminar Hall",
      capacity: "120–200 Students",
      estimatedCost: "₹8,000 – ₹15,000",
      match: 86,
      reason:
        "Suitable for workshops, seminars, presentations and medium-sized student events.",
    },
    {
      name: "Open Ground",
      capacity: "500+ Students",
      estimatedCost: "₹10,000 – ₹20,000",
      match: 78,
      reason:
        "Useful for large cultural events, sports activities and high-capacity gatherings.",
    },
  ]);

  const [foodOptions] = useState<FoodOption[]>([
    {
      name: "Student Meal Package",
      type: "Lunch + Water",
      estimatedCost: "₹120 – ₹180 per person",
      match: 92,
      reason:
        "Affordable and suitable for hackathons, workshops and full-day student events.",
    },
    {
      name: "Snacks & Refreshments",
      type: "Tea + Snacks",
      estimatedCost: "₹60 – ₹100 per person",
      match: 88,
      reason:
        "Good option for short workshops, seminars and evening events.",
    },
    {
      name: "Buffet Package",
      type: "Lunch Buffet",
      estimatedCost: "₹250 – ₹400 per person",
      match: 76,
      reason:
        "Suitable for premium events, guest sessions and formal occasions.",
    },
  ]);

  useEffect(() => {
    const savedEvent = localStorage.getItem("eventiq-current-event");

    if (savedEvent) {
      try {
        setEventData(JSON.parse(savedEvent));
      } catch {
        console.log("Unable to load event");
      }
    }
  }, []);

  const generateRecommendations = () => {
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

          <button
            onClick={() => router.push("/poster-generator")}
            className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-800"
          >
            Poster Generator
          </button>

          <button
            onClick={() => router.push("/event-checklist")}
            className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-800"
          >
            Event Checklist
          </button>

          <button
            onClick={() => router.push("/sponsor-finder")}
            className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-800"
          >
            Sponsor Finder
          </button>

          <button className="w-full text-left px-4 py-3 rounded-xl bg-blue-600 font-semibold">
            Venue & Food Finder
          </button>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <section className="ml-[270px] flex-1 p-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <p className="text-blue-600 text-sm font-semibold">
              AI EVENT LOGISTICS
            </p>

            <h1 className="text-3xl font-bold mt-2">
              Venue & Food Finder
            </h1>

            <p className="text-gray-600 mt-2">
              Find suitable venue and food options based on your event type,
              capacity and budget.
            </p>
          </div>

          {/* EVENT INFO */}
          <div className="bg-[#091120] text-white rounded-2xl p-6 mb-8">
            <p className="text-blue-400 text-xs font-semibold">
              CURRENT EVENT
            </p>

            <h2 className="text-2xl font-bold mt-2">
              {eventData.eventName || "No event selected"}
            </h2>

            <p className="text-gray-400 mt-2">
              {eventData.eventType || "Event type not set"}
              {eventData.capacity
                ? ` • ${eventData.capacity} Students`
                : ""}
              {eventData.date ? ` • ${eventData.date}` : ""}
            </p>
          </div>

          {!generated ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto font-bold">
                AI
              </div>

              <h2 className="text-2xl font-bold mt-5">
                Find Event Logistics
              </h2>

              <p className="text-gray-600 max-w-2xl mx-auto mt-3 leading-7">
                EventIQ will recommend venue and food options using your event
                type, expected capacity and budget needs.
              </p>

              <button
                onClick={generateRecommendations}
                className="mt-7 px-8 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold"
              >
                Find Venue & Food Options
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {/* VENUES */}
              <div>
                <h2 className="text-xl font-bold mb-5">
                  Recommended Venues
                </h2>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
                  {venues.map((venue, index) => (
                    <div
                      key={index}
                      className="bg-white border border-gray-200 rounded-2xl p-6"
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <h3 className="text-xl font-bold">
                            {venue.name}
                          </h3>

                          <p className="text-gray-500 text-sm mt-2">
                            Capacity: {venue.capacity}
                          </p>
                        </div>

                        <span className="text-blue-600 font-bold">
                          {venue.match}%
                        </span>
                      </div>

                      <p className="text-gray-600 mt-4 leading-6 text-sm">
                        {venue.reason}
                      </p>

                      <div className="mt-5 bg-gray-50 rounded-xl p-4">
                        <p className="text-gray-500 text-sm">
                          Estimated Cost
                        </p>

                        <p className="font-bold mt-1">
                          {venue.estimatedCost}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FOOD */}
              <div>
                <h2 className="text-xl font-bold mb-5">
                  Recommended Food Options
                </h2>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
                  {foodOptions.map((food, index) => (
                    <div
                      key={index}
                      className="bg-white border border-gray-200 rounded-2xl p-6"
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <h3 className="text-xl font-bold">
                            {food.name}
                          </h3>

                          <p className="text-gray-500 text-sm mt-2">
                            {food.type}
                          </p>
                        </div>

                        <span className="text-green-600 font-bold">
                          {food.match}%
                        </span>
                      </div>

                      <p className="text-gray-600 mt-4 leading-6 text-sm">
                        {food.reason}
                      </p>

                      <div className="mt-5 bg-gray-50 rounded-xl p-4">
                        <p className="text-gray-500 text-sm">
                          Estimated Cost
                        </p>

                        <p className="font-bold mt-1">
                          {food.estimatedCost}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI RECOMMENDATION */}
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                <h3 className="font-bold text-blue-700 text-lg">
                  AI Logistics Recommendation
                </h3>

                <p className="text-gray-700 mt-3 leading-7">
                  For an event with{" "}
                  <strong>
                    {eventData.capacity || "your expected"} students
                  </strong>
                  , choose a venue with at least 10–15% extra capacity. For
                  full-day events, a student meal package usually offers the
                  best balance between cost and attendee satisfaction.
                </p>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => router.push("/sponsor-finder")}
                  className="px-6 h-12 bg-white border border-gray-300 rounded-xl font-semibold hover:bg-gray-100"
                >
                  ← Sponsor Finder
                </button>

                <button
                  onClick={() => router.push("/dashboard")}
                  className="px-8 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold"
                >
                  Back to Dashboard →
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}