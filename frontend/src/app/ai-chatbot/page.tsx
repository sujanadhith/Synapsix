"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Message = {
  sender: "user" | "ai";
  text: string;
};

type EventData = {
  eventName?: string;
  eventType?: string;
  date?: string;
  venue?: string;
  capacity?: string;
  description?: string;
};

export default function AIChatbotPage() {
  const router = useRouter();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [eventData, setEventData] = useState<EventData>({});

  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "ai",
      text: "Hi! I’m EventIQ AI. Ask me anything about your event.",
    },
  ]);

  useEffect(() => {
    const savedEvent = localStorage.getItem("eventiq-current-event");

    if (savedEvent) {
      try {
        const parsedEvent = JSON.parse(savedEvent);

        setEventData(parsedEvent);

        if (parsedEvent.eventName) {
          setMessages([
            {
              sender: "ai",
              text: `Hi! I’m EventIQ AI. I have your event "${parsedEvent.eventName}". Ask me anything about planning or promoting it.`,
            },
          ]);
        }
      } catch (error) {
        console.error("Unable to load event:", error);
      }
    }
  }, []);

  const sendMessage = async () => {
    if (!message.trim()) return;
    if (loading) return;

    const currentMessage = message;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: currentMessage,
      },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          message: currentMessage,
          event: eventData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Backend request failed");
      }

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: data.reply || "No AI response received.",
        },
      ]);
    } catch (error) {
      console.error("AI chatbot error:", error);

      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "I could not connect to the AI backend. Please make sure the backend server is running on port 5000.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickQuestion = (text: string) => {
    setMessage(text);
  };

  return (
    <main className="min-h-screen bg-[#f6f8fc] flex text-gray-900">
      {/* SIDEBAR */}
      <aside className="w-[270px] min-h-screen bg-[#091120] text-white p-6 fixed left-0 top-0">
        <div className="mb-8">
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
            className="w-full text-left px-4 py-3 rounded-xl bg-blue-600 font-semibold"
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
        </nav>
      </aside>

      {/* MAIN */}
      <section className="ml-[270px] flex-1 p-10">
        <div className="max-w-7xl mx-auto">
          {/* HEADER */}
          <div className="mb-8">
            <p className="text-blue-600 text-sm font-semibold">
              AI ORGANIZER ASSISTANT
            </p>

            <h1 className="text-3xl font-bold mt-2">
              EventIQ AI Assistant
            </h1>

            <p className="text-gray-600 mt-2">
              Chat with AI about your event, audience, promotion,
              engagement and budget.
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-6">
            {/* CHAT BOX */}
            <div className="bg-white border border-gray-200 rounded-2xl min-h-[680px] flex flex-col">
              {/* CHAT HEADER */}
              <div className="border-b border-gray-200 p-5 flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  AI
                </div>

                <div>
                  <h3 className="font-bold text-lg">
                    EventIQ AI
                  </h3>

                  <p className="text-green-600 text-sm">
                    ● Online
                  </p>
                </div>
              </div>

              {/* MESSAGES */}
              <div className="flex-1 p-6 space-y-5 overflow-y-auto max-h-[520px]">
                {messages.map((item, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      item.sender === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[78%] px-5 py-4 rounded-2xl whitespace-pre-line leading-7 ${
                        item.sender === "user"
                          ? "bg-blue-600 text-white rounded-br-md"
                          : "bg-gray-100 text-gray-900 rounded-bl-md"
                      }`}
                    >
                      {item.text}
                    </div>
                  </div>
                ))}

                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-600 px-5 py-4 rounded-2xl">
                      EventIQ AI is thinking...
                    </div>
                  </div>
                )}
              </div>

              {/* INPUT */}
              <div className="border-t border-gray-200 p-5">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={message}
                    disabled={loading}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        sendMessage();
                      }
                    }}
                    placeholder="Ask EventIQ anything about your event..."
                    className="flex-1 h-14 px-5 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder:text-gray-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />

                  <button
                    type="button"
                    disabled={loading}
                    onClick={sendMessage}
                    className={`h-14 px-8 rounded-xl text-white font-semibold ${
                      loading
                        ? "bg-blue-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {loading ? "Thinking..." : "Send"}
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="space-y-6">
              {/* CURRENT EVENT */}
              <div className="bg-[#091120] text-white rounded-2xl p-6">
                <p className="text-blue-400 text-xs font-semibold">
                  CURRENT EVENT
                </p>

                <h3 className="text-xl font-bold mt-3">
                  {eventData.eventName || "No event selected"}
                </h3>

                {eventData.eventType && (
                  <p className="text-gray-400 mt-3">
                    {eventData.eventType}
                  </p>
                )}

                {eventData.capacity && (
                  <p className="text-gray-400 text-sm mt-2">
                    Capacity: {eventData.capacity} Students
                  </p>
                )}

                {eventData.venue && (
                  <p className="text-gray-400 text-sm mt-2">
                    Venue: {eventData.venue}
                  </p>
                )}

                {eventData.date && (
                  <p className="text-gray-400 text-sm mt-2">
                    Date: {eventData.date}
                  </p>
                )}
              </div>

              {/* QUICK QUESTIONS */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h3 className="font-bold text-lg">
                  Ask EventIQ
                </h3>

                <p className="text-gray-500 text-sm mt-1 mb-4">
                  Try one of these questions.
                </p>

                <div className="space-y-3">
                  <button
                    onClick={() =>
                      quickQuestion(
                        "Give me 5 promotion ideas for this event."
                      )
                    }
                    className="w-full text-left p-4 bg-gray-50 hover:bg-blue-50 rounded-xl text-sm font-semibold"
                  >
                    Give me 5 promotion ideas
                  </button>

                  <button
                    onClick={() =>
                      quickQuestion(
                        "Which students should I target for this event and why?"
                      )
                    }
                    className="w-full text-left p-4 bg-gray-50 hover:bg-blue-50 rounded-xl text-sm font-semibold"
                  >
                    Who should I target?
                  </button>

                  <button
                    onClick={() =>
                      quickQuestion(
                        "How can I increase registrations and participation for this event?"
                      )
                    }
                    className="w-full text-left p-4 bg-gray-50 hover:bg-blue-50 rounded-xl text-sm font-semibold"
                  >
                    Increase participation
                  </button>

                  <button
                    onClick={() =>
                      quickQuestion(
                        "Suggest ways to reduce my event budget without reducing quality."
                      )
                    }
                    className="w-full text-left p-4 bg-gray-50 hover:bg-blue-50 rounded-xl text-sm font-semibold"
                  >
                    Reduce event budget
                  </button>
                </div>
              </div>

              {/* AI TOOLS */}
              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                <h3 className="font-bold text-blue-700">
                  AI Organizer Tools
                </h3>

                <div className="space-y-3 mt-4">
                  <button
                    onClick={() => router.push("/ai-description")}
                    className="w-full text-left text-gray-700 hover:text-blue-600 font-semibold"
                  >
                    Improve Description →
                  </button>

                  <button
                    onClick={() => router.push("/target-students")}
                    className="w-full text-left text-gray-700 hover:text-blue-600 font-semibold"
                  >
                    Target Students →
                  </button>

                  <button
                    onClick={() =>
                      router.push("/promotion-strategy")
                    }
                    className="w-full text-left text-gray-700 hover:text-blue-600 font-semibold"
                  >
                    Promotion Strategy →
                  </button>

                  <button
                    onClick={() => router.push("/budget-planner")}
                    className="w-full text-left text-gray-700 hover:text-blue-600 font-semibold"
                  >
                    Budget Planner →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}