"use client";

import { useState } from "react";

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="min-h-screen flex bg-[#f7f9fc]">
      {/* ================= LEFT SIDE ================= */}
      <section className="hidden lg:flex w-1/2 bg-[#091120] text-white flex-col justify-between px-16 py-14">
        {/* Logo */}
        <div>
          <h1 className="text-3xl font-bold">
            EventIQ <span className="text-blue-500">AI</span>
          </h1>

          <p className="text-gray-400 mt-2">
            Organizer Intelligence Assistant
          </p>
        </div>

        {/* Main Content */}
        <div>
          <p className="text-blue-400 font-semibold mb-5">
            AI ORGANIZER ASSISTANT
          </p>

          <h2 className="text-5xl font-bold leading-tight">
            Smarter events.
            <br />

            <span className="text-blue-500">
              Better participation.
            </span>
          </h2>

          <p className="text-gray-400 text-lg leading-8 mt-8 max-w-xl">
            Improve event descriptions, identify target students,
            suggest promotion strategies and predict expected
            engagement using AI.
          </p>

          {/* Feature Cards */}
          <div className="grid grid-cols-2 gap-4 mt-10 max-w-xl">

            <div className="border border-gray-700 rounded-xl p-5">
              <p className="font-semibold text-white">
                AI Descriptions
              </p>

              <p className="text-gray-400 text-sm mt-1">
                Improve event content
              </p>
            </div>

            <div className="border border-gray-700 rounded-xl p-5">
              <p className="font-semibold text-white">
                Target Students
              </p>

              <p className="text-gray-400 text-sm mt-1">
                Find the right audience
              </p>
            </div>

            <div className="border border-gray-700 rounded-xl p-5">
              <p className="font-semibold text-white">
                Promotion Strategy
              </p>

              <p className="text-gray-400 text-sm mt-1">
                Plan better campaigns
              </p>
            </div>

            <div className="border border-gray-700 rounded-xl p-5">
              <p className="font-semibold text-white">
                Engagement Prediction
              </p>

              <p className="text-gray-400 text-sm mt-1">
                Estimate participation
              </p>
            </div>

          </div>
        </div>

        <p className="text-sm text-gray-500">
          HackGuru 2026
        </p>
      </section>


      {/* ================= RIGHT SIDE ================= */}
      <section className="w-full lg:w-1/2 flex items-center justify-center px-8">

        <div className="w-full max-w-lg">

          {/* Mobile Logo */}
          <div className="lg:hidden mb-10">
            <h1 className="text-3xl font-bold text-gray-900">
              EventIQ <span className="text-blue-600">AI</span>
            </h1>
          </div>

          {/* Heading */}
          <h2 className="text-4xl font-bold text-gray-900">
            Welcome Back
          </h2>

          <p className="text-gray-500 mt-3 mb-10">
            Sign in to your organizer workspace.
          </p>


          {/* ================= EMAIL ================= */}
          <div className="mb-6">

            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Email Address
            </label>

            <div className="relative">

              {/* Email Icon */}
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-lg">
                ✉
              </span>

              <input
                type="email"
                placeholder="Email address"
                className="
                  w-full
                  h-14
                  pl-12
                  pr-4
                  rounded-xl
                  border
                  border-gray-300
                  bg-white
                  text-gray-900
                  placeholder:text-gray-500
                  outline-none
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-100
                "
              />

            </div>
          </div>


          {/* ================= PASSWORD ================= */}
          <div>

            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Password
            </label>

            <div className="relative">

              {/* Lock Icon */}
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600">
                🔒
              </span>

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="
                  w-full
                  h-14
                  pl-12
                  pr-14
                  rounded-xl
                  border
                  border-gray-300
                  bg-white
                  text-gray-900
                  placeholder:text-gray-500
                  outline-none
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-100
                "
              />

              {/* Show / Hide Password */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-700
                  hover:text-blue-600
                  cursor-pointer
                "
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "◉" : "◉"}
              </button>

            </div>


            {/* Forgot Password */}
            <div className="text-right mt-3">

              <button
                type="button"
                className="text-blue-600 hover:text-blue-700 text-sm font-semibold cursor-pointer"
              >
                Forgot Password?
              </button>

            </div>
          </div>


          {/* ================= LOGIN BUTTON ================= */}
          <button
            type="button"
            className="
              w-full
              h-14
              bg-blue-600
              hover:bg-blue-700
              text-white
              font-semibold
              rounded-xl
              mt-8
              transition
              cursor-pointer
            "
          >
            Login
          </button>


          {/* ================= DIVIDER ================= */}
          <div className="flex items-center gap-4 my-8">

            <div className="flex-1 h-px bg-gray-300"></div>

            <span className="text-gray-500 text-sm">
              or continue with
            </span>

            <div className="flex-1 h-px bg-gray-300"></div>

          </div>


          {/* ================= SOCIAL LOGIN ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Google */}
            <button
              type="button"
              className="
                h-14
                border
                border-gray-300
                bg-white
                text-gray-900
                rounded-xl
                font-semibold
                hover:bg-gray-100
                flex
                items-center
                justify-center
                gap-3
                transition
                cursor-pointer
              "
            >
              <span className="text-xl font-bold text-blue-600">
                G
              </span>

              <span className="text-gray-900">
                Login with Google
              </span>
            </button>


            {/* Apple */}
            <button
              type="button"
              className="
                h-14
                border
                border-gray-300
                bg-white
                text-gray-900
                rounded-xl
                font-semibold
                hover:bg-gray-100
                flex
                items-center
                justify-center
                gap-3
                transition
                cursor-pointer
              "
            >
              <span className="text-2xl text-black">
                
              </span>

              <span className="text-gray-900">
                Login with Apple
              </span>
            </button>

          </div>


          {/* ================= SIGN UP ================= */}
          <p className="text-center text-sm text-gray-500 mt-8">

            Don&apos;t have an account?{" "}

            <button
              type="button"
              className="text-blue-600 hover:text-blue-700 font-semibold cursor-pointer"
            >
              Sign up
            </button>

          </p>

        </div>

      </section>

    </main>
  );
}