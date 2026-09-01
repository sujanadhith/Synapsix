"use client";

import { usePathname, useRouter } from "next/navigation";

const menuItems = [
  { label: "Dashboard", path: "/dashboard" },
  { label: "Create Event", path: "/create-event" },
  { label: "AI Chatbot", path: "/ai-chatbot" },
  { label: "AI Description", path: "/ai-description" },
  { label: "Target Students", path: "/target-students" },
  { label: "Promotion Strategy", path: "/promotion-strategy" },
  { label: "Budget Planner", path: "/budget-planner" },
  { label: "Event Calendar", path: "/event-calendar" },
  { label: "Poster Generator", path: "/poster-generator" },
  { label: "Event Checklist", path: "/event-checklist" },
  { label: "Sponsor Finder", path: "/sponsor-finder" },
  { label: "Venue & Food Finder", path: "/venue-food-finder" },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <aside className="w-[270px] min-h-screen bg-[#091120] text-white p-6 fixed left-0 top-0 overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">
          EventIQ <span className="text-blue-500">AI</span>
        </h1>

        <p className="text-gray-400 text-sm mt-2">
          Organizer Intelligence
        </p>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const active = pathname === item.path;

          return (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className={`w-full text-left px-4 py-3 rounded-xl transition ${
                active
                  ? "bg-blue-600 text-white font-semibold"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}