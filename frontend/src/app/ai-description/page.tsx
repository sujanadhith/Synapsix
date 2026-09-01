"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";

type EventData = {
  eventName?: string;
  eventType?: string;
  date?: string;
  venue?: string;
  capacity?: string;
  description?: string;
  improvedDescription?: string;
};

export default function AIDescriptionPage() {
  const router = useRouter();

  const [eventData, setEventData] = useState<EventData>({});
  const [improvedDescription, setImprovedDescription] = useState("");

  useEffect(() => {
    const savedEvent = localStorage.getItem("eventiq-current-event");

    if (savedEvent) {
      try {
        const parsed = JSON.parse(savedEvent);

        setEventData(parsed);

        if (parsed.improvedDescription) {
          setImprovedDescription(parsed.improvedDescription);
        }
      } catch {
        console.log("Unable to load event");
      }
    }
  }, []);

  const generateDescription = () => {
    const eventName = eventData.eventName || "your event";
    const eventType = eventData.eventType || "college event";

    const generated = `Get ready for ${eventName}!

Join us for an exciting ${eventType} designed to bring together students who want to learn, collaborate and participate in a meaningful experience.

${eventData.description || "Explore new ideas, build skills and connect with other students."}

Why should students participate?

• Learn useful skills
• Collaborate with other students
• Gain practical experience
• Explore new ideas and opportunities
• Build confidence through participation

Don’t miss your chance to be part of ${eventName}. Register now and be part of the experience!`;

    setImprovedDescription(generated);
  };

  const saveDescription = () => {
    const updatedEvent = {
      ...eventData,
      description: improvedDescription,
      improvedDescription,
    };

    localStorage.setItem(
      "eventiq-current-event",
      JSON.stringify(updatedEvent)
    );

    setEventData(updatedEvent);

    alert("AI description saved successfully!");
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
                AI CONTENT INTELLIGENCE
              </p>

              <h1 className="text-3xl font-bold mt-2">
                AI Event Description
              </h1>

              <p className="text-gray-600 mt-2">
                Improve your event description and make it more attractive to
                the right students.
              </p>
            </div>

            <button
              type="button"
              onClick={() => router.push("/ai-chatbot")}
              className="h-12 px-6 bg-white border border-gray-300 rounded-xl font-semibold hover:bg-gray-50"
            >
              Ask AI Assistant
            </button>
          </div>

          {/* CURRENT EVENT */}
          <div className="bg-[#091120] text-white rounded-2xl p-6 mb-8">
            <p className="text-blue-400 text-xs font-semibold">
              CURRENT EVENT
            </p>

            <h2 className="text-2xl font-bold mt-2">
              {eventData.eventName || "No event selected"}
            </h2>

            <div className="flex flex-wrap gap-3 mt-4">
              {eventData.eventType && (
                <span className="bg-white/10 px-3 py-2 rounded-lg text-sm">
                  {eventData.eventType}
                </span>
              )}

              {eventData.date && (
                <span className="bg-white/10 px-3 py-2 rounded-lg text-sm">
                  {eventData.date}
                </span>
              )}

              {eventData.venue && (
                <span className="bg-white/10 px-3 py-2 rounded-lg text-sm">
                  {eventData.venue}
                </span>
              )}

              {eventData.capacity && (
                <span className="bg-white/10 px-3 py-2 rounded-lg text-sm">
                  {eventData.capacity} Students
                </span>
              )}
            </div>
          </div>

          {/* DESCRIPTION AREA */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* ORIGINAL */}
            <div className="bg-white border border-gray-200 rounded-2xl p-7">
              <div className="flex justify-between items-start gap-4 mb-5">
                <div>
                  <h2 className="text-xl font-bold">
                    Original Description
                  </h2>

                  <p className="text-gray-500 text-sm mt-1">
                    Your current event description
                  </p>
                </div>

                <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-2 rounded-full">
                  ORIGINAL
                </span>
              </div>

              <textarea
                value={eventData.description || ""}
                onChange={(e) =>
                  setEventData({
                    ...eventData,
                    description: e.target.value,
                  })
                }
                placeholder="Create an event first or enter an event description..."
                className="w-full min-h-[360px] p-5 border border-gray-300 rounded-xl resize-none outline-none leading-7 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />

              <button
                type="button"
                onClick={generateDescription}
                disabled={!eventData.eventName}
                className={`w-full h-14 mt-6 rounded-xl font-semibold ${
                  eventData.eventName
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                Generate Improved Description
              </button>
            </div>

            {/* AI VERSION */}
            <div className="bg-white border border-gray-200 rounded-2xl p-7">
              <div className="flex justify-between items-start gap-4 mb-5">
                <div>
                  <h2 className="text-xl font-bold">
                    AI Improved Description
                  </h2>

                  <p className="text-gray-500 text-sm mt-1">
                    Optimized for student interest and participation
                  </p>
                </div>

                <span className="bg-blue-50 text-blue-600 text-xs font-semibold px-3 py-2 rounded-full">
                  AI GENERATED
                </span>
              </div>

              {!improvedDescription ? (
                <div className="min-h-[360px] bg-gray-50 border border-dashed border-gray-300 rounded-xl flex items-center justify-center">
                  <div className="text-center max-w-sm px-6">
                    <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto font-bold">
                      AI
                    </div>

                    <h3 className="font-bold text-lg mt-5">
                      Ready to improve your description
                    </h3>

                    <p className="text-gray-500 text-sm mt-2 leading-6">
                      Click Generate Improved Description and EventIQ will
                      create a more engaging version for students.
                    </p>
                  </div>
                </div>
              ) : (
                <textarea
                  value={improvedDescription}
                  onChange={(e) => setImprovedDescription(e.target.value)}
                  className="w-full min-h-[360px] p-5 bg-blue-50 border border-blue-100 rounded-xl resize-none outline-none leading-7"
                />
              )}

              <button
                type="button"
                onClick={saveDescription}
                disabled={!improvedDescription}
                className={`w-full h-14 mt-6 rounded-xl font-semibold ${
                  improvedDescription
                    ? "bg-[#091120] hover:bg-gray-800 text-white"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                Save AI Description
              </button>
            </div>
          </div>

          {/* AI SUGGESTIONS */}
          <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6 mt-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-7">
              <h3 className="text-xl font-bold">
                AI Improvement Suggestions
              </h3>

              <p className="text-gray-500 text-sm mt-1 mb-6">
                Ways to make your event content stronger.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-5">
                  <p className="font-semibold">
                    Clear Student Benefits
                  </p>

                  <p className="text-gray-600 text-sm mt-2 leading-6">
                    Explain clearly what students will learn, gain or
                    experience.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-5">
                  <p className="font-semibold">
                    Strong Opening
                  </p>

                  <p className="text-gray-600 text-sm mt-2 leading-6">
                    Start with an attractive line that immediately creates
                    interest.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-5">
                  <p className="font-semibold">
                    Participation Value
                  </p>

                  <p className="text-gray-600 text-sm mt-2 leading-6">
                    Highlight practical experience, networking and skill
                    development.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-xl p-5">
                  <p className="font-semibold">
                    Clear Call to Action
                  </p>

                  <p className="text-gray-600 text-sm mt-2 leading-6">
                    End with a clear instruction encouraging students to
                    register.
                  </p>
                </div>
              </div>
            </div>

            {/* QUALITY */}
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <p className="text-gray-500 text-sm">
                  Description Quality
                </p>

                <div className="flex items-end justify-between mt-3">
                  <h3
                    className={`text-4xl font-bold ${
                      improvedDescription
                        ? "text-blue-600"
                        : "text-gray-700"
                    }`}
                  >
                    {improvedDescription ? "87" : "48"}
                  </h3>

                  <span className="text-gray-400 text-sm">
                    / 100
                  </span>
                </div>

                <div className="h-3 bg-gray-200 rounded-full mt-5 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      improvedDescription
                        ? "w-[87%] bg-blue-600"
                        : "w-[48%] bg-gray-400"
                    }`}
                  />
                </div>

                <p className="text-gray-600 text-sm leading-6 mt-5">
                  {improvedDescription
                    ? "The improved description has stronger clarity, benefits and student appeal."
                    : "Generate an AI version to improve clarity and engagement."}
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                <p className="text-blue-600 text-xs font-semibold">
                  NEXT STEP
                </p>

                <h3 className="font-bold text-lg mt-2">
                  Identify Target Students
                </h3>

                <p className="text-gray-600 text-sm mt-2 leading-6">
                  Use your improved description to identify the student groups
                  most likely to participate.
                </p>

                <button
                  type="button"
                  onClick={() => router.push("/target-students")}
                  className="w-full h-12 mt-5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold"
                >
                  Find Target Students →
                </button>
              </div>
            </div>
          </div>

          {/* BOTTOM NAVIGATION */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => router.push("/create-event")}
              className="px-6 h-12 bg-white border border-gray-300 rounded-xl font-semibold hover:bg-gray-50"
            >
              ← Create Event
            </button>

            <button
              onClick={() => router.push("/target-students")}
              className="px-8 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold"
            >
              Continue to Target Students →
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}