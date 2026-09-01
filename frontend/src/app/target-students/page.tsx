"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type EventData = {
  eventName: string;
  eventType: string;
  date: string;
  venue: string;
  capacity: string;
  description: string;
  improvedDescription?: string;
};

type TargetGroup = {
  name: string;
  match: number;
  reason: string;
};

export default function TargetStudentsPage() {
  const router = useRouter();

  const [eventData, setEventData] = useState<EventData>({
    eventName: "",
    eventType: "",
    date: "",
    venue: "",
    capacity: "",
    description: "",
  });

  const [targetGroups, setTargetGroups] = useState<TargetGroup[]>([]);
  const [analyzed, setAnalyzed] = useState(false);

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

  const analyzeStudents = () => {
    const eventText =
      `${eventData.eventName} ${eventData.eventType} ${eventData.description}`
        .toLowerCase();

    let groups: TargetGroup[] = [];

    if (
      eventText.includes("hackathon") ||
      eventText.includes("coding") ||
      eventText.includes("ai") ||
      eventText.includes("technology") ||
      eventText.includes("technical")
    ) {
      groups = [
        {
          name: "CSE Students",
          match: 94,
          reason:
            "Strong match with programming, AI, software development and technical competitions.",
        },
        {
          name: "IT Students",
          match: 91,
          reason:
            "Likely to be interested in software, technology and problem-solving events.",
        },
        {
          name: "AI & Data Science Students",
          match: 88,
          reason:
            "Relevant for students interested in AI, machine learning and data-driven projects.",
        },
        {
          name: "ECE Students",
          match: 74,
          reason:
            "Useful for students interested in electronics, embedded systems and technology projects.",
        },
      ];
    } else if (
      eventText.includes("cultural") ||
      eventText.includes("dance") ||
      eventText.includes("music") ||
      eventText.includes("art")
    ) {
      groups = [
        {
          name: "Arts & Cultural Club Students",
          match: 95,
          reason:
            "Students already interested in cultural activities are highly likely to participate.",
        },
        {
          name: "First & Second Year Students",
          match: 89,
          reason:
            "Junior students often show strong participation in campus cultural events.",
        },
        {
          name: "Music & Dance Club Members",
          match: 87,
          reason:
            "Direct interest match for performance and entertainment events.",
        },
        {
          name: "All College Students",
          match: 78,
          reason:
            "Cultural events generally have broad appeal across departments.",
        },
      ];
    } else if (
      eventText.includes("sport") ||
      eventText.includes("football") ||
      eventText.includes("cricket") ||
      eventText.includes("basketball")
    ) {
      groups = [
        {
          name: "Sports Club Students",
          match: 96,
          reason:
            "Students already involved in sports are the strongest audience.",
        },
        {
          name: "College Team Members",
          match: 92,
          reason:
            "Competitive players are highly likely to participate.",
        },
        {
          name: "First & Second Year Students",
          match: 82,
          reason:
            "Junior students commonly participate in college sports activities.",
        },
        {
          name: "All College Students",
          match: 72,
          reason:
            "The event may also attract students interested in watching or supporting teams.",
        },
      ];
    } else if (
      eventText.includes("workshop") ||
      eventText.includes("seminar")
    ) {
      groups = [
        {
          name: "Students Interested in Skill Development",
          match: 93,
          reason:
            "Workshops and seminars strongly appeal to students looking to improve their skills.",
        },
        {
          name: "Second & Third Year Students",
          match: 88,
          reason:
            "Students in these years often focus on projects, internships and career development.",
        },
        {
          name: "Department Club Members",
          match: 81,
          reason:
            "Students involved in academic clubs are more likely to attend learning events.",
        },
        {
          name: "First Year Students",
          match: 70,
          reason:
            "The event can help new students explore additional skills and interests.",
        },
      ];
    } else {
      groups = [
        {
          name: "Students Related to Event Department",
          match: 88,
          reason:
            "Students studying subjects related to the event are likely to have the strongest interest.",
        },
        {
          name: "Second & Third Year Students",
          match: 82,
          reason:
            "These students are generally active in technical and extracurricular events.",
        },
        {
          name: "College Club Members",
          match: 76,
          reason:
            "Active club members often participate in and promote college events.",
        },
        {
          name: "All Interested Students",
          match: 68,
          reason:
            "A wider promotion can help discover students with matching interests.",
        },
      ];
    }

    setTargetGroups(groups);
    setAnalyzed(true);

    const updatedEvent = {
      ...eventData,
      targetStudents: groups,
    };

    localStorage.setItem(
      "eventiq-current-event",
      JSON.stringify(updatedEvent)
    );
  };

  const continueToPromotion = () => {
    router.push("/promotion-strategy");
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

          <button className="w-full text-left px-4 py-4 rounded-xl bg-blue-600 font-semibold">
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
      <section className="ml-[270px] flex-1 p-8 lg:p-10">
        <div className="max-w-7xl mx-auto">
          {/* HEADER */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold">
              Target Students
            </h1>

            <p className="text-gray-600 mt-2">
              Let EventIQ AI identify students who are most likely to be
              interested in your event.
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

            <div className="flex flex-wrap gap-3 mt-4">
              {eventData.eventType && (
                <span className="bg-gray-800 px-3 py-2 rounded-lg text-sm">
                  {eventData.eventType}
                </span>
              )}

              {eventData.capacity && (
                <span className="bg-gray-800 px-3 py-2 rounded-lg text-sm">
                  Capacity: {eventData.capacity}
                </span>
              )}

              {eventData.venue && (
                <span className="bg-gray-800 px-3 py-2 rounded-lg text-sm">
                  {eventData.venue}
                </span>
              )}

              {eventData.date && (
                <span className="bg-gray-800 px-3 py-2 rounded-lg text-sm">
                  {eventData.date}
                </span>
              )}
            </div>
          </div>

          {/* AI ANALYSIS */}
          {!analyzed ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                AI
              </div>

              <h2 className="text-2xl font-bold mt-5">
                Find Your Target Audience
              </h2>

              <p className="text-gray-600 max-w-2xl mx-auto mt-3 leading-7">
                EventIQ will analyze your event type, title and description
                to identify student groups that are most likely to
                participate.
              </p>

              <button
                type="button"
                onClick={analyzeStudents}
                disabled={!eventData.eventName}
                className={`mt-7 px-8 h-14 rounded-xl font-semibold transition ${
                  eventData.eventName
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                Analyze Target Students
              </button>

              {!eventData.eventName && (
                <p className="text-red-500 text-sm mt-4">
                  Create an event first before running the analysis.
                </p>
              )}
            </div>
          ) : (
            <>
              {/* SUMMARY */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                <div className="bg-white border border-gray-200 rounded-2xl p-6">
                  <p className="text-gray-500 text-sm">
                    Recommended Groups
                  </p>

                  <h3 className="text-3xl font-bold mt-2">
                    {targetGroups.length}
                  </h3>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-6">
                  <p className="text-gray-500 text-sm">
                    Best Audience Match
                  </p>

                  <h3 className="text-3xl font-bold text-blue-600 mt-2">
                    {targetGroups[0]?.match || 0}%
                  </h3>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-6">
                  <p className="text-gray-500 text-sm">
                    Event Capacity
                  </p>

                  <h3 className="text-3xl font-bold mt-2">
                    {eventData.capacity || "Not set"}
                  </h3>
                </div>
              </div>

              {/* TARGET GROUPS */}
              <div className="bg-white border border-gray-200 rounded-2xl p-7">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-bold">
                      AI Recommended Student Groups
                    </h2>

                    <p className="text-gray-500 text-sm mt-1">
                      Ranked according to expected interest in this event.
                    </p>
                  </div>

                  <span className="bg-blue-50 text-blue-600 text-sm font-semibold px-4 py-2 rounded-full">
                    AI ANALYSIS
                  </span>
                </div>

                <div className="space-y-5">
                  {targetGroups.map((group, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-2xl p-6"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 font-bold flex items-center justify-center">
                              {index + 1}
                            </div>

                            <h3 className="text-lg font-bold">
                              {group.name}
                            </h3>
                          </div>

                          <p className="text-gray-600 text-sm leading-6 mt-3 ml-12">
                            {group.reason}
                          </p>
                        </div>

                        <div className="md:w-52">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-500">
                              Audience Match
                            </span>

                            <span className="font-bold text-blue-600">
                              {group.match}%
                            </span>
                          </div>

                          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-600 rounded-full"
                              style={{
                                width: `${group.match}%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI INSIGHT */}
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mt-6">
                <h3 className="font-bold text-blue-700">
                  AI Audience Insight
                </h3>

                <p className="text-gray-700 mt-2 leading-7">
                  Focus your first promotion campaign on{" "}
                  <strong>{targetGroups[0]?.name}</strong>. They have the
                  strongest predicted interest in {eventData.eventName}.
                  After reaching this group, expand promotion to the other
                  recommended audiences.
                </p>
              </div>

              {/* BUTTONS */}
              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={() => router.push("/ai-description")}
                  className="px-6 h-12 border border-gray-300 bg-white rounded-xl font-semibold hover:bg-gray-100"
                >
                  ← Back
                </button>

                <button
                  type="button"
                  onClick={continueToPromotion}
                  className="px-8 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold"
                >
                  Create Promotion Strategy →
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}