"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Home() {

  const router = useRouter()

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get("token");
    if(token) {
      localStorage.setItem("token", token)
      router.push("/dashboard")
    }
  }, [])

  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <h1 className="text-4xl font-bold">Welcome to the admin of the Text Editor</h1>
      <p className="text-2xl font-medium my-2 ">An account is needed to view this website</p>
      <a href="http://localhost:5000/auth/google" >
        <button
          className="inline-block rounded border border-gray-400 bg-gray-400 px-10 py-2 my-2 text-base font-medium text-white hover:bg-transparent hover:text-gray-400 focus:outline-none focus:ring active:text-gray-400"
        >
          Sign in with Google
        </button>
      </a>
    </div>
  );
}
