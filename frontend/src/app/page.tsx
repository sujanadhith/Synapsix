"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard");
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f6f8fc]">
      <p className="text-gray-600 font-medium">
        Opening dashboard...
      </p>
    </main>
  );
}