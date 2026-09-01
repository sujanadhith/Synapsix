"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Sponsor = {
  name: string;
  category: string;
  match: number;
  reason: string;
  estimatedAmount: string;
  status: "Not Contacted" | "Contacted" | "Interested";
};

type EventData = {
  eventName?: string;
  eventType?: string;
  date?: string;
  venue?: string;
  capacity?: string;
};

export default function SponsorFinderPage() {
  const router = useRouter();

  const [eventData, setEventData] = useState<EventData>({});
  const [generated, setGenerated] = useState(false);
  const [message, setMessage] = useState("");

  const [sponsors, setSponsors] = useState<Sponsor[]>([
    {
      name: "Technology Company",
      category: "Tech Sponsor",
      match: 94,
      reason:
        "Strong fit for hackathons, coding events, AI events and student innovation programs.",
      estimatedAmount: "₹20,000 – ₹50,000",
      status: "Not Contacted",
    },
    {
      name: "Local Startup",
      category: "Startup Partner",
      match: 88,
      reason:
        "Startups often support student innovation, recruitment and technical competitions.",
      estimatedAmount: "₹10,000 – ₹30,000",
      status: "Not Contacted",
    },
    {
      name: "Training Institute",
      category: "Education Partner",
      match: 83,
      reason:
        "Training institutes can sponsor prizes, certificates, workshops and student learning activities.",
      estimatedAmount: "₹8,000 – ₹25,000",
      status: "Not Contacted",
    },
    {
      name: "Food & Beverage Brand",
      category: "Refreshment Partner",
      match: 74,
      reason:
        "Useful for refreshments, coupons, food stalls or event-day support.",
      estimatedAmount: "₹5,000 – ₹15,000",
      status: "Not Contacted",
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

  const generateSponsors = () => {
    setGenerated(true);
  };

  const generateOutreach = () => {
    const eventName = eventData.eventName || "our upcoming college event";

    setMessage(
      `Subject: Sponsorship Opportunity – ${eventName}

Dear Sponsor,

We are organizing ${eventName}, an upcoming college event designed to encourage student participation, innovation and learning.

We would be delighted to have your organization as a sponsor. Your support can help us improve the event experience while giving your brand visibility among students.

We would be happy to discuss sponsorship benefits, branding opportunities and partnership options.

Thank you for considering this opportunity.

Regards,
Event Organizing Team`
    );
  };

  const updateStatus = (
    index: number,
    status: Sponsor["status"]
  ) => {
    const updated = [...sponsors];
    updated[index].status = status;
    setSponsors(updated);
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

          <button className="w-full text-left px-4 py-3 rounded-xl bg-blue-600 font-semibold">
            Sponsor Finder
          </button>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <section className="ml-[270px] flex-1 p-10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <p className="text-blue-600 text-sm font-semibold">
              AI SPONSOR INTELLIGENCE
            </p>

            <h1 className="text-3xl font-bold mt-2">
              Sponsor Finder
            </h1>

            <p className="text-gray-600 mt-2">
              Find suitable sponsor categories and prepare professional
              outreach messages for your event.
            </p>
          </div>

          {/* CURRENT EVENT */}
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
            </p>
          </div>

          {!generated ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto font-bold">
                AI
              </div>

              <h2 className="text-2xl font-bold mt-5">
                Find Suitable Sponsors
              </h2>

              <p className="text-gray-600 max-w-2xl mx-auto mt-3 leading-7">
                EventIQ will analyze your event and recommend sponsor
                categories based on event type, student audience and
                sponsorship potential.
              </p>

              <button
                onClick={generateSponsors}
                className="mt-7 px-8 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold"
              >
                Find Sponsors with AI
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-6">
              {/* SPONSORS */}
              <div className="space-y-5">
                {sponsors.map((sponsor, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-2xl p-6"
                  >
                    <div className="flex flex-col md:flex-row md:justify-between gap-5">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="text-xl font-bold">
                            {sponsor.name}
                          </h3>

                          <span className="bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full">
                            {sponsor.category}
                          </span>
                        </div>

                        <p className="text-gray-600 mt-3 leading-6">
                          {sponsor.reason}
                        </p>

                        <p className="text-sm text-gray-500 mt-4">
                          Estimated Sponsorship:
                          <span className="font-bold text-gray-900 ml-2">
                            {sponsor.estimatedAmount}
                          </span>
                        </p>
                      </div>

                      <div className="md:w-52">
                        <p className="text-sm text-gray-500">
                          Sponsor Match
                        </p>

                        <p className="text-2xl font-bold text-blue-600 mt-1">
                          {sponsor.match}%
                        </p>

                        <div className="h-3 bg-gray-200 rounded-full mt-3 overflow-hidden">
                          <div
                            className="h-full bg-blue-600"
                            style={{
                              width: `${sponsor.match}%`,
                            }}
                          />
                        </div>

                        <select
                          value={sponsor.status}
                          onChange={(e) =>
                            updateStatus(
                              index,
                              e.target.value as Sponsor["status"]
                            )
                          }
                          className="w-full h-10 mt-4 border border-gray-300 rounded-lg px-3 bg-white text-sm"
                        >
                          <option>Not Contacted</option>
                          <option>Contacted</option>
                          <option>Interested</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* RIGHT SIDE */}
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                  <h3 className="font-bold text-blue-700">
                    AI Sponsor Recommendation
                  </h3>

                  <p className="text-gray-700 mt-3 leading-7">
                    Focus first on technology companies and startups because
                    they provide the strongest match for student technical
                    events and innovation-focused programs.
                  </p>
                </div>

                <div className="bg-white border border-gray-200 rounded-2xl p-6">
                  <h3 className="font-bold text-lg">
                    Sponsorship Outreach
                  </h3>

                  <p className="text-gray-500 text-sm mt-1 mb-4">
                    Generate a professional sponsor message.
                  </p>

                  <button
                    onClick={generateOutreach}
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold"
                  >
                    Generate Outreach Message
                  </button>

                  {message && (
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full h-80 mt-5 border border-gray-300 rounded-xl p-4 resize-none text-sm leading-6"
                    />
                  )}
                </div>

                <button
                  onClick={() => router.push("/dashboard")}
                  className="w-full h-12 bg-[#091120] text-white rounded-xl font-semibold hover:bg-gray-800"
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}