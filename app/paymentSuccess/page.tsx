'use client'
import {Coffee, CheckCircle2Icon} from "lucide-react";
import React from "react";

export default function paymentSuccessful() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-white font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-15 bg-zinc-50 dark:bg-black sm:items-start">
       
        {/* Hero section */}
        <div className="flex flex-col w-full justify-center items-center">
          <span className="inline-flex items-center px-5 py-5 rounded-full bg-[#D9CCC6]">
             <Coffee className="h-12 w-12 text-zinc-600 dark:text-zinc-400" />
          </span>

          <div className="flex flex-col w-full justify-center items-center text-center mt-5 space-y-2">
            <h1 className="text-lg font-semibold">Elise - Full Stack Developer</h1>
            <p className="text-md">Building website, mobile app and side projects.</p>
            
            <div className="bg-amber-50 border border-amber-200 text-amber-800 text-sm text-center px-4 py-2 rounded-lg">
              Demo project · Stripe test mode · No real charges
            </div>
          </div>

          <div className="flex flex-col bg-white rounded-lg border border-gray-300 p-5 w-full justify-center items-center text-center mt-10 space-y-4">
            <CheckCircle2Icon className="h-16 w-16 text-green-500" />
            <h2 className="text-2xl font-bold mt-10">Payment Successful!</h2>
            <p className="text-lg mt-4">Thank you for your support! Your payment has been processed successfully.</p>
          </div>
        </div>
       
      </main>
    </div>
  );
}
