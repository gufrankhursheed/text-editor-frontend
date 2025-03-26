"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const router = useRouter();

    useEffect(() => {
      if (typeof window !== "undefined") {
        const token = new URLSearchParams(window.location.search).get("token");
        if (token) {
          localStorage.setItem("token", token);
          router.replace("/dashboard"); 
        } else {
          const storedToken = localStorage.getItem("token");
          if (!storedToken) {
            router.push("/");
          }
        }
      }
    }, [router]);

  const handleLogout = async () => {
    await fetch("http://localhost:5000/auth/logout", { credentials: "include" });
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <div className="h-screen flex items-center justify-center flex-col bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
      <p className="text-xl my-4 text-gray-700">You are logged in with Google</p>
      <button onClick={handleLogout} className="rounded border border-red-400 bg-red-400 px-6 py-2 text-white hover:bg-transparent hover:text-red-400 transition">
        Logout
      </button>
    </div>
  );
}

