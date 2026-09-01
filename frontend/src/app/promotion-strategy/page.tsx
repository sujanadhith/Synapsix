"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type TargetGroup = {
  name: string;
  match: number;
  reason: string;
};

type EventData = {
  eventName: string;
  eventType: string;
  date: string;
  venue: string;
  capacity: string;
  description: string;
  improvedDescription?: string;
  targetStudents?: TargetGroup[];
};

type Strategy = {
  channel: string;
  priority: string;
  action: string;
  audience: string;
  reach: string;
};

export default function PromotionStrategyPage() {
  const router = useRouter();

  const [eventData, setEventData] = useState<EventData>({
    eventName: "",
    eventType: "",
    date: "",
    venue: "",
    capacity: "",
    description: "",
  });

  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [generated, setGenerated] = useState(false);

  useEffect(() => {
    const savedEvent = localStorage.getItem("eventiq-current-event");

    if (savedEvent) {
      try {
        const parsedEvent = JSON.parse(savedEvent);
        setEventData(parsedEvent);
      } catch (error) {
        console.error("Unable to read event data:", error);
      }
    }
  }, []);

  const generateStrategy = () => {
    const topAudience =
      eventData.targetStudents?.[0]?.name || "Interested Students";

    const result: Strategy[] = [
      {
        channel: "Instagram",
        priority: "High Priority",
        action:
          "Post reels, stories and attractive event posters during evening hours.",
        audience: topAudience,
        reach: "High",
      },
      {
        channel: "WhatsApp",
        priority: "High Priority",
        action:
          "Share the event in class groups, department groups and student club groups.",
        audience: topAudience,
        reach: "High",
      },
      {
        channel: "Email",
        priority: "Medium Priority",
        action:
          "Send targeted invitations with event benefits, date and registration link.",
        audience: "Department Students",
        reach: "Medium",
      },
      {
        channel: "Campus Promotion",
        priority: "Medium Priority",
        action:
          "Use posters and student ambassadors near departments and common areas.",
        audience: "All Interested Students",
        reach: "Medium",
      },
    ];

    setStrategies(result);
    setGenerated(true);

    const updatedEvent = {
      ...eventData,
      promotionStrategy: result,
      predictedEngagement: 82,
      expectedRegistrations: 350,
      studentsReached: 1248,
    };

    localStorage.setItem(
      "eventiq-current-event",
      JSON.stringify(updatedEvent)
    );
  };

  const goToDashboard = () => {
    router.push("/dashboard");
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

        <nav className="space-y-3">
          <button
            onClick={() => router.push("/dashboard")}
            className="w-full text-left px-4 py-4 rounded-xl hover:bg-gray-800 transition"
          >
            Dashboard
          </button>

          <button
            onClick={() => router.push("/create-event")}
            className="w-full text-left px-4 py-4 rounded-xl hover:bg-gray-800 transition"
          >
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

          <button className="w-full text-left px-4 py-4 rounded-xl bg-blue-600 font-semibold">
            Promotion Strategy
          </button>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <section className="ml-[270px] flex-1 p-8 lg:p-10">
        <div className="max-w-7xl mx-auto">
          {/* HEADER */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold">
              AI Promotion Strategy
            </h1>

            <p className="text-gray-600 mt-2">
              Generate the best channels, timing and campaign plan for your event.
            </p>
          </div>

          {/* CURRENT EVENT */}
          <div className="bg-[#091120] text-white rounded-2xl p-6 mb-8">
            <p className="text-blue-400 text-sm font-semibold">
              CURRENT EVENT
            </p>

            <h2 className="text-2xl font-bold mt-2">
              {eventData.eventName || "No event selected"}
            </h2>

            <p className="text-gray-400 mt-2">
              {eventData.eventType || "Event type not set"}
              {eventData.venue ? ` • ${eventData.venue}` : ""}
              {eventData.capacity
                ? ` • ${eventData.capacity} Students`
                : ""}
            </p>
          </div>

          {!generated ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto font-bold text-xl">
                AI
              </div>

              <h2 className="text-2xl font-bold mt-5">
                Generate Promotion Strategy
              </h2>

              <p className="text-gray-600 max-w-2xl mx-auto mt-3 leading-7">
                EventIQ will use your event details and target-student analysis
                to recommend the best promotion channels, audience and timing.
              </p>

              <button
                type="button"
                onClick={generateStrategy}
                disabled={!eventData.eventName}
                className={`mt-7 px-8 h-14 rounded-xl font-semibold transition ${
                  eventData.eventName
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                Generate AI Promotion Plan
              </button>
            </div>
          ) : (
            <>
              {/* STRATEGY LIST */}
              <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6">
                <div className="space-y-5">
                  {strategies.map((strategy, index) => (
                    <div
                      key={index}
                      className="bg-white border border-gray-200 rounded-2xl p-6"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-3">
                            <h3 className="text-xl font-bold">
                              {strategy.channel}
                            </h3>

                            <span
                              className={`text-xs font-semibold px-3 py-1 rounded-full ${
                                strategy.priority === "High Priority"
                                  ? "bg-green-50 text-green-700"
                                  : "bg-yellow-50 text-yellow-700"
                              }`}
                            >
                              {strategy.priority}
                            </span>
                          </div>

                          <p className="text-gray-600 mt-3 leading-6">
                            {strategy.action}
                          </p>

                          <p className="text-sm text-gray-500 mt-3">
                            Target Audience:{" "}
                            <span className="font-semibold text-gray-800">
                              {strategy.audience}
                            </span>
                          </p>
                        </div>

                        <div>
                          <p className="text-gray-500 text-sm">
                            Expected Reach
                          </p>

                          <p
                            className={`font-bold mt-1 ${
                              strategy.reach === "High"
                                ? "text-green-600"
                                : "text-orange-500"
                            }`}
                          >
                            {strategy.reach}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* AI RECOMMENDATION */}
                  <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                    <h3 className="font-bold text-blue-700 text-lg">
                      AI Recommendation
                    </h3>

                    <p className="text-gray-700 mt-3 leading-7">
                      Focus first on{" "}
                      <strong>
                        {eventData.targetStudents?.[0]?.name ||
                          "your strongest target audience"}
                      </strong>
                      . Use Instagram and WhatsApp as the main channels, then
                      expand with email and campus promotion.
                    </p>
                  </div>
                </div>

                {/* RIGHT PANEL */}
                <div className="space-y-6">
                  <div className="bg-white border border-gray-200 rounded-2xl p-6">
                    <p className="text-gray-500 text-sm">
                      Best Time to Promote
                    </p>

                    <h3 className="text-3xl font-bold mt-2">
                      6 PM – 9 PM
                    </h3>

                    <p className="text-gray-600 mt-3">
                      Student activity is usually stronger during evening hours.
                    </p>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-2xl p-6">
                    <p className="text-gray-500 text-sm">
                      Start Campaign
                    </p>

                    <h3 className="text-2xl font-bold mt-2">
                      5–7 Days Before
                    </h3>

                    <p className="text-gray-600 mt-3">
                      This gives enough time for awareness and reminders.
                    </p>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-2xl p-6">
                    <h3 className="font-bold text-lg mb-5">
                      AI Campaign Timeline
                    </h3>

                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold">Day 1</p>
                        <p className="text-sm text-gray-600">
                          Main event announcement
                        </p>
                      </div>

                      <div>
                        <p className="font-semibold">Day 3</p>
                        <p className="text-sm text-gray-600">
                          Department and club promotion
                        </p>
                      </div>

                      <div>
                        <p className="font-semibold">Day 5</p>
                        <p className="text-sm text-gray-600">
                          Instagram reel + WhatsApp reminder
                        </p>
                      </div>

                      <div>
                        <p className="font-semibold">Final Day</p>
                        <p className="text-sm text-gray-600">
                          Last registration push
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* FINAL BUTTON */}
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={() => router.push("/target-students")}
                  className="px-6 h-12 border border-gray-300 bg-white rounded-xl font-semibold hover:bg-gray-100"
                >
                  ← Back
                </button>

                <button
                  type="button"
                  onClick={goToDashboard}
                  className="px-8 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold"
                >
                  Save Strategy & View Dashboard →
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}