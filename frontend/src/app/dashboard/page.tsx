"use client";

import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";

export default function DashboardPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-[#f6f8fc] flex text-gray-900">
      {/* REUSABLE SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <section className="ml-[270px] flex-1 p-8 lg:p-10">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-blue-600 text-sm font-semibold">
              EVENTIQ AI
            </p>

            <h1 className="text-3xl font-bold mt-2">
              Smart Dashboard
            </h1>

            <p className="text-gray-600 mt-2">
              Manage your event, track engagement and use AI organizer tools
              from one place.
            </p>
          </div>

          <button
            onClick={() => router.push("/create-event")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            + Create Event
          </button>
        </div>

        {/* HERO */}
        <div className="bg-[#0b1220] text-white rounded-2xl p-8 mb-8">
          <p className="text-blue-400 text-sm font-semibold">
            AI EVENT COMMAND CENTER
          </p>

          <h2 className="text-2xl font-bold mt-3">
            Smarter planning. Better participation.
          </h2>

          <p className="text-gray-300 mt-3 max-w-3xl leading-7">
            Improve event descriptions, identify target students, plan
            promotions, manage budgets, create posters, find sponsors,
            organize logistics and predict engagement using EventIQ AI.
          </p>
        </div>

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <p className="text-gray-500 text-sm">
              Total Events
            </p>

            <h3 className="text-3xl font-bold mt-2">
              05
            </h3>

            <p className="text-green-600 text-sm mt-2">
              +2 this month
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <p className="text-gray-500 text-sm">
              Registrations
            </p>

            <h3 className="text-3xl font-bold mt-2">
              684
            </h3>

            <p className="text-green-600 text-sm mt-2">
              +18% growth
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <p className="text-gray-500 text-sm">
              Predicted Engagement
            </p>

            <h3 className="text-3xl font-bold text-blue-600 mt-2">
              82%
            </h3>

            <p className="text-gray-500 text-sm mt-2">
              High confidence
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <p className="text-gray-500 text-sm">
              Students Reached
            </p>

            <h3 className="text-3xl font-bold mt-2">
              1,248
            </h3>

            <p className="text-green-600 text-sm mt-2">
              +12% this week
            </p>
          </div>
        </div>

        {/* ANALYTICS */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
          {/* ENGAGEMENT */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">
                  Engagement Prediction
                </h3>

                <p className="text-gray-500 text-sm mt-1">
                  AI-powered participation forecast
                </p>
              </div>

              <span className="bg-green-50 text-green-600 text-sm font-semibold px-3 py-1 rounded-full">
                High
              </span>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-7">
              <div>
                <p className="text-gray-500 text-sm">
                  Expected
                </p>

                <h4 className="text-2xl font-bold mt-2">
                  350
                </h4>

                <p className="text-gray-400 text-xs mt-1">
                  registrations
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Engagement
                </p>

                <h4 className="text-2xl font-bold text-blue-600 mt-2">
                  82%
                </h4>

                <p className="text-gray-400 text-xs mt-1">
                  predicted
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-sm">
                  Confidence
                </p>

                <h4 className="text-xl font-bold text-green-600 mt-2">
                  High
                </h4>

                <p className="text-gray-400 text-xs mt-1">
                  AI confidence
                </p>
              </div>
            </div>

            {/* SIMPLE CHART */}
            <div className="mt-8">
              <p className="font-semibold mb-5">
                Registration Trend
              </p>

              <div className="h-52 flex items-end justify-around gap-4 border-b border-gray-200 px-4">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-14 bg-blue-200 rounded-t-lg" />
                  <span className="text-xs text-gray-400">
                    Mon
                  </span>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-20 bg-blue-300 rounded-t-lg" />
                  <span className="text-xs text-gray-400">
                    Tue
                  </span>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-28 bg-blue-300 rounded-t-lg" />
                  <span className="text-xs text-gray-400">
                    Wed
                  </span>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-24 bg-blue-400 rounded-t-lg" />
                  <span className="text-xs text-gray-400">
                    Thu
                  </span>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-36 bg-blue-500 rounded-t-lg" />
                  <span className="text-xs text-gray-400">
                    Fri
                  </span>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="w-10 h-44 bg-blue-600 rounded-t-lg" />
                  <span className="text-xs text-gray-400">
                    Sat
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* EVENT ANALYTICS */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h3 className="text-xl font-bold">
              Event Analytics
            </h3>

            <p className="text-gray-500 text-sm mt-1">
              Key insights from EventIQ
            </p>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-gray-500 text-sm">
                  Top Audience
                </p>

                <h4 className="font-bold mt-2">
                  CSE + IT Students
                </h4>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <p className="text-gray-500 text-sm">
                  Best Channel
                </p>

                <h4 className="font-bold mt-2">
                  Instagram
                </h4>
              </div>
            </div>

            <div className="mt-6">
              <p className="font-semibold mb-4">
                Recent Events
              </p>

              <div className="space-y-3">
                <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl">
                  <div>
                    <p className="font-semibold">
                      AI Hackathon
                    </p>

                    <p className="text-gray-400 text-xs mt-1">
                      Technical Event
                    </p>
                  </div>

                  <span className="text-green-600 font-bold">
                    91%
                  </span>
                </div>

                <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl">
                  <div>
                    <p className="font-semibold">
                      Coding Workshop
                    </p>

                    <p className="text-gray-400 text-xs mt-1">
                      Workshop
                    </p>
                  </div>

                  <span className="text-blue-600 font-bold">
                    84%
                  </span>
                </div>

                <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl">
                  <div>
                    <p className="font-semibold">
                      Design Sprint
                    </p>

                    <p className="text-gray-400 text-xs mt-1">
                      Design Event
                    </p>
                  </div>

                  <span className="text-orange-500 font-bold">
                    73%
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 text-blue-700 p-4 rounded-xl mt-6">
              <p className="font-semibold">
                AI Insight
              </p>

              <p className="text-sm mt-1 leading-6">
                Start promotion 5–7 days before the event and focus on
                Instagram and student WhatsApp groups.
              </p>
            </div>
          </div>
        </div>

        {/* AI ORGANIZER TOOLS */}
        <div className="mb-8">
          <div className="mb-5">
            <h2 className="text-xl font-bold">
              AI Organizer Tools
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              Use AI to improve event planning and participation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <button
              onClick={() => router.push("/ai-chatbot")}
              className="bg-white border border-gray-200 rounded-2xl p-5 text-left hover:border-blue-500 hover:shadow-sm transition"
            >
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold mb-4">
                AI
              </div>

              <p className="font-bold">
                AI Assistant
              </p>

              <p className="text-gray-600 text-sm mt-2 leading-6">
                Chat with EventIQ about your event.
              </p>
            </button>

            <button
              onClick={() => router.push("/ai-description")}
              className="bg-white border border-gray-200 rounded-2xl p-5 text-left hover:border-blue-500 hover:shadow-sm transition"
            >
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold mb-4">
                ✦
              </div>

              <p className="font-bold">
                AI Description
              </p>

              <p className="text-gray-600 text-sm mt-2 leading-6">
                Generate attractive event descriptions.
              </p>
            </button>

            <button
              onClick={() => router.push("/target-students")}
              className="bg-white border border-gray-200 rounded-2xl p-5 text-left hover:border-blue-500 hover:shadow-sm transition"
            >
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold mb-4">
                ◎
              </div>

              <p className="font-bold">
                Target Students
              </p>

              <p className="text-gray-600 text-sm mt-2 leading-6">
                Identify the most relevant audience.
              </p>
            </button>

            <button
              onClick={() => router.push("/promotion-strategy")}
              className="bg-white border border-gray-200 rounded-2xl p-5 text-left hover:border-blue-500 hover:shadow-sm transition"
            >
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold mb-4">
                ↑
              </div>

              <p className="font-bold">
                Promotion Strategy
              </p>

              <p className="text-gray-600 text-sm mt-2 leading-6">
                Plan channels and campaign timing.
              </p>
            </button>
          </div>
        </div>

        {/* EVENT MANAGEMENT TOOLS */}
        <div className="mb-8">
          <div className="mb-5">
            <h2 className="text-xl font-bold">
              Event Management
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              Plan your event from budget to execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <button
              onClick={() => router.push("/budget-planner")}
              className="bg-white border border-gray-200 rounded-2xl p-5 text-left hover:border-blue-500 hover:shadow-sm transition"
            >
              <p className="font-bold">
                Budget Planner
              </p>

              <p className="text-gray-600 text-sm mt-2 leading-6">
                Plan expenses and monitor event spending.
              </p>

              <p className="text-blue-600 text-sm font-semibold mt-4">
                Open Planner →
              </p>
            </button>

            <button
              onClick={() => router.push("/event-calendar")}
              className="bg-white border border-gray-200 rounded-2xl p-5 text-left hover:border-blue-500 hover:shadow-sm transition"
            >
              <p className="font-bold">
                Event Calendar
              </p>

              <p className="text-gray-600 text-sm mt-2 leading-6">
                Track important dates and deadlines.
              </p>

              <p className="text-blue-600 text-sm font-semibold mt-4">
                Open Calendar →
              </p>
            </button>

            <button
              onClick={() => router.push("/poster-generator")}
              className="bg-white border border-gray-200 rounded-2xl p-5 text-left hover:border-blue-500 hover:shadow-sm transition"
            >
              <p className="font-bold">
                Poster Generator
              </p>

              <p className="text-gray-600 text-sm mt-2 leading-6">
                Create promotional poster content.
              </p>

              <p className="text-blue-600 text-sm font-semibold mt-4">
                Create Poster →
              </p>
            </button>

            <button
              onClick={() => router.push("/event-checklist")}
              className="bg-white border border-gray-200 rounded-2xl p-5 text-left hover:border-blue-500 hover:shadow-sm transition"
            >
              <p className="font-bold">
                Event Checklist
              </p>

              <p className="text-gray-600 text-sm mt-2 leading-6">
                Track preparation and event readiness.
              </p>

              <p className="text-blue-600 text-sm font-semibold mt-4">
                View Checklist →
              </p>
            </button>
          </div>
        </div>

        {/* PARTNERS & LOGISTICS */}
        <div className="mb-10">
          <div className="mb-5">
            <h2 className="text-xl font-bold">
              Partners & Logistics
            </h2>

            <p className="text-gray-500 text-sm mt-1">
              Find sponsors, venues and food options for your event.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* SPONSOR FINDER */}
            <button
              onClick={() => router.push("/sponsor-finder")}
              className="bg-[#091120] text-white rounded-2xl p-6 text-left hover:bg-[#111c30] transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-blue-400 text-xs font-semibold">
                    AI SPONSOR INTELLIGENCE
                  </p>

                  <h3 className="text-xl font-bold mt-2">
                    Sponsor Finder
                  </h3>
                </div>

                <span className="text-blue-400 text-2xl">
                  →
                </span>
              </div>

              <p className="text-gray-400 mt-4 leading-6">
                Discover suitable sponsor categories, estimate sponsorship
                potential and generate professional outreach messages.
              </p>

              <div className="flex gap-2 mt-5 flex-wrap">
                <span className="bg-white/10 text-gray-300 px-3 py-1 rounded-full text-xs">
                  Sponsor Matching
                </span>

                <span className="bg-white/10 text-gray-300 px-3 py-1 rounded-full text-xs">
                  Outreach
                </span>

                <span className="bg-white/10 text-gray-300 px-3 py-1 rounded-full text-xs">
                  Match Score
                </span>
              </div>
            </button>

            {/* VENUE FOOD FINDER */}
            <button
              onClick={() => router.push("/venue-food-finder")}
              className="bg-white border border-gray-200 rounded-2xl p-6 text-left hover:border-blue-500 hover:shadow-sm transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-blue-600 text-xs font-semibold">
                    AI EVENT LOGISTICS
                  </p>

                  <h3 className="text-xl font-bold mt-2">
                    Venue & Food Finder
                  </h3>
                </div>

                <span className="text-blue-600 text-2xl">
                  →
                </span>
              </div>

              <p className="text-gray-600 mt-4 leading-6">
                Find suitable venue and food options based on event capacity,
                type and estimated budget.
              </p>

              <div className="flex gap-2 mt-5 flex-wrap">
                <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs">
                  Venue
                </span>

                <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs">
                  Food
                </span>

                <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs">
                  Cost Estimate
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* FOOTER */}
        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between gap-3 text-sm text-gray-400">
          <p>
            EventIQ AI • Organizer Intelligence Platform
          </p>

          <p>
            HackGuru 2026
          </p>
        </div>
      </section>
    </main>
  );
}