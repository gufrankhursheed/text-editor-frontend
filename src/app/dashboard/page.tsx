"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import NotePicker from "../components/NotePicker";
import Notes from "../components/Notes";

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
        <div className="bg-slate-950 w-full min-h-screen pb-10">
            <div className="flex justify-end mb-4">
                <button
                    onClick={handleLogout}
                    className="m-3 px-4 py-2 bg-red-600 text-white rounded-lg hover:cursor-pointer hover:bg-red-700 transition"
                >
                    Logout
                </button>
            </div>
            <NotePicker />
            <Notes />
        </div>
    );
}

