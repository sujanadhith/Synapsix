"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type EventData = {
  eventName?: string;
  eventType?: string;
  capacity?: string;
};

export default function BudgetPlannerPage() {
  const router = useRouter();

  const [eventData, setEventData] = useState<EventData>({});

  const [totalBudget, setTotalBudget] = useState<number>(50000);
  const [venue, setVenue] = useState<number>(10000);
  const [food, setFood] = useState<number>(12000);
  const [promotion, setPromotion] = useState<number>(5000);
  const [prizes, setPrizes] = useState<number>(8000);
  const [equipment, setEquipment] = useState<number>(4000);
  const [miscellaneous, setMiscellaneous] = useState<number>(3000);

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

  const totalSpent = useMemo(() => {
    return (
      venue +
      food +
      promotion +
      prizes +
      equipment +
      miscellaneous
    );
  }, [
    venue,
    food,
    promotion,
    prizes,
    equipment,
    miscellaneous,
  ]);

  const remaining = totalBudget - totalSpent;

  const usedPercentage =
    totalBudget > 0
      ? Math.min((totalSpent / totalBudget) * 100, 100)
      : 0;

  const getSuggestion = () => {
    if (totalBudget <= 0) {
      return "Enter your total event budget to receive recommendations.";
    }

    if (totalSpent > totalBudget) {
      return `Your plan is ₹${(
        totalSpent - totalBudget
      ).toLocaleString("en-IN")} over budget. Reduce lower-priority expenses before confirming the event.`;
    }

    if (food > totalBudget * 0.35) {
      return "Food is taking a large part of the budget. Consider comparing vendors or using student meal packages.";
    }

    if (promotion > totalBudget * 0.2) {
      return "Promotion spending is relatively high. Use Instagram, WhatsApp and student communities to reduce paid promotion costs.";
    }

    if (remaining > totalBudget * 0.2) {
      return "Your budget is healthy. Keep part of the remaining amount as an emergency reserve for unexpected event expenses.";
    }

    return "Your budget allocation looks balanced. Keep a small emergency reserve before finalizing the event.";
  };

  const saveBudget = () => {
    const savedEvent = localStorage.getItem(
      "eventiq-current-event"
    );

    const currentEvent = savedEvent
      ? JSON.parse(savedEvent)
      : {};

    const updatedEvent = {
      ...currentEvent,

      budget: {
        totalBudget,
        venue,
        food,
        promotion,
        prizes,
        equipment,
        miscellaneous,
        totalSpent,
        remaining,
      },
    };

    localStorage.setItem(
      "eventiq-current-event",
      JSON.stringify(updatedEvent)
    );

    alert("Budget saved successfully!");
  };

  const BudgetInput = ({
    label,
    value,
    setter,
  }: {
    label: string;
    value: number;
    setter: (value: number) => void;
  }) => {
    return (
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">
          {label}
        </label>

        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
            ₹
          </span>

          <input
            type="number"
            min="0"
            value={value}
            onChange={(e) =>
              setter(Number(e.target.value))
            }
            className="w-full h-14 pl-9 pr-4 border border-gray-300 rounded-xl bg-white text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-[#f6f8fc] flex text-gray-900">
      {/* SIDEBAR */}

      <aside className="w-[270px] min-h-screen bg-[#091120] text-white p-6 fixed left-0 top-0">
        <div className="mb-10">
          <h1 className="text-2xl font-bold">
            EventIQ{" "}
            <span className="text-blue-500">
              AI
            </span>
          </h1>

          <p className="text-gray-400 text-sm mt-2">
            Organizer Intelligence
          </p>
        </div>

        <nav className="space-y-2">
          <button
            onClick={() =>
              router.push("/dashboard")
            }
            className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-800"
          >
            Dashboard
          </button>

          <button
            onClick={() =>
              router.push("/create-event")
            }
            className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-800"
          >
            Create Event
          </button>

          <button
            onClick={() =>
              router.push("/ai-chatbot")
            }
            className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-800"
          >
            AI Chatbot
          </button>

          <button
            onClick={() =>
              router.push("/ai-description")
            }
            className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-800"
          >
            AI Description
          </button>

          <button
            onClick={() =>
              router.push("/target-students")
            }
            className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-800"
          >
            Target Students
          </button>

          <button
            onClick={() =>
              router.push("/promotion-strategy")
            }
            className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-800"
          >
            Promotion Strategy
          </button>

          <button className="w-full text-left px-4 py-3 rounded-xl bg-blue-600 font-semibold">
            Budget Planner
          </button>

          <button
            onClick={() =>
              router.push("/event-calendar")
            }
            className="w-full text-left px-4 py-3 rounded-xl hover:bg-gray-800"
          >
            Event Calendar
          </button>
        </nav>
      </aside>

      {/* CONTENT */}

      <section className="ml-[270px] flex-1 p-10">
        <div className="max-w-7xl mx-auto">
          {/* HEADER */}

          <div className="mb-8">
            <p className="text-blue-600 font-semibold text-sm">
              AI ORGANIZER TOOL
            </p>

            <h1 className="text-3xl font-bold mt-2">
              Smart Budget Planner
            </h1>

            <p className="text-gray-600 mt-2">
              Plan event expenses and keep your
              spending under control.
            </p>
          </div>

          {/* CURRENT EVENT */}

          <div className="bg-[#091120] text-white rounded-2xl p-6 mb-7">
            <p className="text-blue-400 text-xs font-semibold">
              CURRENT EVENT
            </p>

            <h2 className="text-2xl font-bold mt-2">
              {eventData.eventName ||
                "No event selected"}
            </h2>

            <p className="text-gray-400 mt-2">
              {eventData.eventType ||
                "Create an event to connect it with this budget."}

              {eventData.capacity &&
                ` • ${eventData.capacity} Students`}
            </p>
          </div>

          {/* SUMMARY CARDS */}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-7">
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <p className="text-gray-500 text-sm">
                Total Budget
              </p>

              <h2 className="text-3xl font-bold mt-2">
                ₹
                {totalBudget.toLocaleString(
                  "en-IN"
                )}
              </h2>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <p className="text-gray-500 text-sm">
                Planned Expenses
              </p>

              <h2 className="text-3xl font-bold mt-2">
                ₹
                {totalSpent.toLocaleString(
                  "en-IN"
                )}
              </h2>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <p className="text-gray-500 text-sm">
                Remaining Budget
              </p>

              <h2
                className={`text-3xl font-bold mt-2 ${
                  remaining >= 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                ₹
                {remaining.toLocaleString(
                  "en-IN"
                )}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-6">
            {/* EXPENSE FORM */}

            <div className="bg-white border border-gray-200 rounded-2xl p-7">
              <h2 className="text-xl font-bold">
                Budget Allocation
              </h2>

              <p className="text-gray-500 text-sm mt-1 mb-7">
                Enter your estimated expenses.
              </p>

              <div className="mb-6">
                <BudgetInput
                  label="Total Event Budget"
                  value={totalBudget}
                  setter={setTotalBudget}
                />
              </div>

              <div className="border-t border-gray-200 pt-6">
                <p className="font-bold mb-5">
                  Expense Categories
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <BudgetInput
                    label="Venue"
                    value={venue}
                    setter={setVenue}
                  />

                  <BudgetInput
                    label="Food & Refreshments"
                    value={food}
                    setter={setFood}
                  />

                  <BudgetInput
                    label="Promotion & Marketing"
                    value={promotion}
                    setter={setPromotion}
                  />

                  <BudgetInput
                    label="Prizes & Certificates"
                    value={prizes}
                    setter={setPrizes}
                  />

                  <BudgetInput
                    label="Equipment & Technical"
                    value={equipment}
                    setter={setEquipment}
                  />

                  <BudgetInput
                    label="Miscellaneous"
                    value={miscellaneous}
                    setter={setMiscellaneous}
                  />
                </div>
              </div>

              <button
                onClick={saveBudget}
                className="w-full h-14 mt-7 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold"
              >
                Save Budget Plan
              </button>
            </div>

            {/* RIGHT SIDE */}

            <div className="space-y-6">
              {/* BUDGET USAGE */}

              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h3 className="text-lg font-bold">
                  Budget Usage
                </h3>

                <div className="flex justify-between mt-6">
                  <span className="text-gray-500">
                    Used
                  </span>

                  <span className="font-bold">
                    {usedPercentage.toFixed(0)}%
                  </span>
                </div>

                <div className="h-4 bg-gray-200 rounded-full mt-3 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      totalSpent > totalBudget
                        ? "bg-red-500"
                        : "bg-blue-600"
                    }`}
                    style={{
                      width: `${usedPercentage}%`,
                    }}
                  />
                </div>

                <div className="flex justify-between mt-5 text-sm">
                  <span className="text-gray-500">
                    ₹
                    {totalSpent.toLocaleString(
                      "en-IN"
                    )}{" "}
                    used
                  </span>

                  <span className="text-gray-500">
                    ₹
                    {totalBudget.toLocaleString(
                      "en-IN"
                    )}
                  </span>
                </div>
              </div>

              {/* AI SUGGESTION */}

              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold">
                    AI
                  </div>

                  <div>
                    <p className="text-xs text-blue-600 font-semibold">
                      EVENTIQ AI
                    </p>

                    <h3 className="font-bold">
                      Budget Recommendation
                    </h3>
                  </div>
                </div>

                <p className="text-gray-700 leading-7 mt-5">
                  {getSuggestion()}
                </p>
              </div>

              {/* EXPENSE BREAKDOWN */}

              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-5">
                  Expense Breakdown
                </h3>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Venue
                    </span>
                    <strong>
                      ₹{venue.toLocaleString("en-IN")}
                    </strong>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Food
                    </span>
                    <strong>
                      ₹{food.toLocaleString("en-IN")}
                    </strong>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Promotion
                    </span>
                    <strong>
                      ₹
                      {promotion.toLocaleString(
                        "en-IN"
                      )}
                    </strong>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Prizes
                    </span>
                    <strong>
                      ₹
                      {prizes.toLocaleString(
                        "en-IN"
                      )}
                    </strong>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Equipment
                    </span>
                    <strong>
                      ₹
                      {equipment.toLocaleString(
                        "en-IN"
                      )}
                    </strong>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Miscellaneous
                    </span>
                    <strong>
                      ₹
                      {miscellaneous.toLocaleString(
                        "en-IN"
                      )}
                    </strong>
                  </div>

                  <div className="border-t border-gray-200 pt-4 flex justify-between text-base">
                    <span className="font-bold">
                      Total
                    </span>

                    <strong>
                      ₹
                      {totalSpent.toLocaleString(
                        "en-IN"
                      )}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM NAVIGATION */}

          <div className="flex justify-between mt-8">
            <button
              onClick={() =>
                router.push(
                  "/promotion-strategy"
                )
              }
              className="px-6 h-12 bg-white border border-gray-300 rounded-xl font-semibold hover:bg-gray-100"
            >
              ← Promotion Strategy
            </button>

            <button
              onClick={() =>
                router.push("/event-calendar")
              }
              className="px-8 h-12 bg-[#091120] hover:bg-gray-800 text-white rounded-xl font-semibold"
            >
              Event Calendar →
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}