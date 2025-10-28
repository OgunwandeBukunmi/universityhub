"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const[error,setError] = useState("")
   const router = useRouter();




  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !password.trim()) {
        setError("Incomplete Credentials")
        return
    }
    let currentname = name.trim()
    let currentpassword  = password.trim()
    try{
        const request = await fetch("/api/login", {
            method :"POST",
            headers: { 'Content-Type': 'application/json' },
            body : JSON.stringify({name : currentname,password : currentpassword})
        })
        const response = await request.json()
        if(response.success === true ){
          
         
        router.push("/dashboard");
        }else{
          setError(response.message)
        }
        
    }catch(err){
        setError("An Error occured")
        console.log("Error")
    }
  };

  const handlePublish = async () => {

  };



    return (
      <div className="min-h-screen bg-background text-black flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md bg-white shadow-xl rounded-xl p-8 border border-gray-100">
          <h2 className="text-3xl font-extrabold text-center text-background mb-8 tracking-tight">
            Welcome Back
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error ? (<div className="text-red-800 bg-red-300  p-3 ">
              <p className="font-bold">{error}</p></div>
            ):(<></>)}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Username
              </label>
              <input
                type="text"
                id="name"
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-pink-200 transition"
                placeholder="you@example.com"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-pink-200 transition"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-800 transition duration-200"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- Editor view


