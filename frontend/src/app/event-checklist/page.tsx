"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type ChecklistItem = {
  id: number;
  title: string;
  category: string;
  completed: boolean;
};

type EventData = {
  eventName?: string;
  eventType?: string;
  date?: string;
  venue?: string;
};

export default function EventChecklistPage() {
  const router = useRouter();

  const [eventData, setEventData] = useState<EventData>({});

  const [items, setItems] = useState<ChecklistItem[]>([
    {
      id: 1,
      title: "Confirm event venue",
      category: "Venue",
      completed: false,
    },
    {
      id: 2,
      title: "Get required permissions",
      category: "Approval",
      completed: false,
    },
    {
      id: 3,
      title: "Finalize food and refreshments",
      category: "Food",
      completed: false,
    },
    {
      id: 4,
      title: "Confirm volunteers",
      category: "Team",
      completed: false,
    },
    {
      id: 5,
      title: "Generate event poster",
      category: "Promotion",
      completed: false,
    },
    {
      id: 6,
      title: "Start promotion campaign",
      category: "Promotion",
      completed: false,
    },
    {
      id: 7,
      title: "Check registrations",
      category: "Registration",
      completed: false,
    },
    {
      id: 8,
      title: "Prepare certificates and prizes",
      category: "Rewards",
      completed: false,
    },
    {
      id: 9,
      title: "Verify technical equipment",
      category: "Equipment",
      completed: false,
    },
    {
      id: 10,
      title: "Send final event reminder",
      category: "Reminder",
      completed: false,
    },
  ]);

  useEffect(() => {
    const savedEvent = localStorage.getItem("eventiq-current-event");

    if (savedEvent) {
      try {
        const parsed = JSON.parse(savedEvent);
        setEventData(parsed);

        if (parsed.checklist) {
          setItems(parsed.checklist);
        }
      } catch {
        console.log("Unable to load event");
      }
    }
  }, []);

  const completedCount = useMemo(() => {
    return items.filter((item) => item.completed).length;
  }, [items]);

  const progress =
    items.length > 0
      ? Math.round((completedCount / items.length) * 100)
      : 0;

  const toggleItem = (id: number) => {
    const updated = items.map((item) =>
      item.id === id
        ? { ...item, completed: !item.completed }
        : item
    );

    setItems(updated);

    const savedEvent = localStorage.getItem("eventiq-current-event");

    const currentEvent = savedEvent
      ? JSON.parse(savedEvent)
      : {};

    localStorage.setItem(
      "eventiq-current-event",
      JSON.stringify({
        ...currentEvent,
        checklist: updated,
      })
    );
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

          <button className="w-full text-left px-4 py-3 rounded-xl bg-blue-600 font-semibold">
            Event Checklist
          </button>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <section className="ml-[270px] flex-1 p-10">
        <div className="max-w-7xl mx-auto">
          {/* HEADER */}
          <div className="mb-8">
            <p className="text-blue-600 text-sm font-semibold">
              SMART EVENT MANAGEMENT
            </p>

            <h1 className="text-3xl font-bold mt-2">
              Event Checklist
            </h1>

            <p className="text-gray-600 mt-2">
              Track everything required before your event starts.
            </p>
          </div>

          {/* EVENT CARD */}
          <div className="bg-[#091120] text-white rounded-2xl p-6 mb-7">
            <p className="text-blue-400 text-xs font-semibold">
              CURRENT EVENT
            </p>

            <h2 className="text-2xl font-bold mt-2">
              {eventData.eventName || "No event selected"}
            </h2>

            <p className="text-gray-400 mt-2">
              {eventData.eventType || "Event type not set"}

              {eventData.date && ` • ${eventData.date}`}

              {eventData.venue && ` • ${eventData.venue}`}
            </p>
          </div>

          {/* SUMMARY */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-7">
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <p className="text-gray-500 text-sm">
                Total Tasks
              </p>

              <h3 className="text-3xl font-bold mt-2">
                {items.length}
              </h3>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <p className="text-gray-500 text-sm">
                Completed
              </p>

              <h3 className="text-3xl font-bold text-green-600 mt-2">
                {completedCount}
              </h3>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <p className="text-gray-500 text-sm">
                Event Readiness
              </p>

              <h3 className="text-3xl font-bold text-blue-600 mt-2">
                {progress}%
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6">
            {/* CHECKLIST */}
            <div className="bg-white border border-gray-200 rounded-2xl p-7">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold">
                    Organizer Tasks
                  </h2>

                  <p className="text-gray-500 text-sm mt-1">
                    Mark each item as you complete it.
                  </p>
                </div>

                <span className="bg-blue-50 text-blue-600 text-sm font-semibold px-4 py-2 rounded-full">
                  {completedCount}/{items.length} Done
                </span>
              </div>

              <div className="space-y-4">
                {items.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={`w-full flex items-center gap-4 text-left border rounded-2xl p-5 transition ${
                      item.completed
                        ? "bg-green-50 border-green-200"
                        : "bg-white border-gray-200 hover:border-blue-400"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold ${
                        item.completed
                          ? "bg-green-600 border-green-600 text-white"
                          : "border-gray-300"
                      }`}
                    >
                      {item.completed ? "✓" : ""}
                    </div>

                    <div className="flex-1">
                      <p
                        className={`font-semibold ${
                          item.completed
                            ? "text-gray-500 line-through"
                            : "text-gray-900"
                        }`}
                      >
                        {item.title}
                      </p>

                      <p className="text-sm text-gray-500 mt-1">
                        {item.category}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="space-y-6">
              {/* PROGRESS */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h3 className="font-bold text-lg">
                  Event Readiness
                </h3>

                <div className="flex justify-between text-sm mt-5">
                  <span className="text-gray-500">
                    Progress
                  </span>

                  <strong>{progress}%</strong>
                </div>

                <div className="h-4 bg-gray-200 rounded-full mt-3 overflow-hidden">
                  <div
                    className="h-full bg-blue-600 rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <p className="text-gray-600 text-sm leading-6 mt-5">
                  {progress === 100
                    ? "Your checklist is complete. Your event is ready to go."
                    : progress >= 70
                    ? "Great progress. Finish the remaining tasks before event day."
                    : progress >= 40
                    ? "Your planning is moving forward. Focus on the unfinished priority items."
                    : "Several important tasks are still pending. Start with venue, approvals and promotion."}
                </p>
              </div>

              {/* AI ADVICE */}
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold">
                    AI
                  </div>

                  <div>
                    <p className="text-blue-600 text-xs font-semibold">
                      EVENTIQ AI
                    </p>

                    <h3 className="font-bold">
                      Organizer Recommendation
                    </h3>
                  </div>
                </div>

                <p className="text-gray-700 leading-7 mt-5">
                  Complete critical tasks such as venue confirmation,
                  permissions, equipment and promotion before focusing on
                  lower-priority activities.
                </p>
              </div>

              {/* QUICK LINKS */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-4">
                  Quick Tools
                </h3>

                <div className="space-y-3">
                  <button
                    onClick={() => router.push("/poster-generator")}
                    className="w-full text-left bg-gray-50 hover:bg-gray-100 rounded-xl p-4 font-semibold"
                  >
                    Create Poster →
                  </button>

                  <button
                    onClick={() => router.push("/budget-planner")}
                    className="w-full text-left bg-gray-50 hover:bg-gray-100 rounded-xl p-4 font-semibold"
                  >
                    Check Budget →
                  </button>

                  <button
                    onClick={() => router.push("/event-calendar")}
                    className="w-full text-left bg-gray-50 hover:bg-gray-100 rounded-xl p-4 font-semibold"
                  >
                    View Calendar →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => router.push("/poster-generator")}
              className="px-6 h-12 bg-white border border-gray-300 rounded-xl font-semibold hover:bg-gray-100"
            >
              ← Poster Generator
            </button>

            <button
              onClick={() => router.push("/dashboard")}
              className="px-8 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold"
            >
              View Dashboard →
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}