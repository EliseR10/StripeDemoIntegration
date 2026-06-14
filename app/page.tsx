'use client'
import {Coffee, LockKeyhole} from "lucide-react";
import React, { useState } from "react";

export default function Home() {
  const amounts = [3, 5, 10];
  const [amountSelected, setAmountSelected] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const testCards = [
    { card: "4242 4242 4242 4242", label: "Success" },
    { card: "4000 0000 0000 9995", label: "Declined" },
    { card: "4000 0025 0000 3155", label: "Requires auth" },
  ];

  const handleCustomAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const sanitizedValue = rawValue
      .replace(/[^\d.]/g, "")
      .replace(/^(\d*\.?\d*).*$/, "$1");

    setCustomAmount(sanitizedValue);
    setAmountSelected(null); // Deselect predefined amounts when custom amount is entered
  };

  const handlePayment = async () => {
    console.log(`Initiating payment with amount: ${amountSelected ?? customAmount}`);
    const amount = amountSelected ?? (customAmount ? Number(customAmount) : 0)

    try {
      const res = await fetch('/api/checkout_session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      })
      
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Unknown' }))
        setErrorMsg(`Payment failed: ${err.error || 'Unknown error'}`);
        return;
      }
      
      const data = await res.json().catch(() => ({} as { url?: string }))
      if (data.url) {
        window.location.href = data.url
      } else {
        setErrorMsg('Payment failed: No redirect URL');
        return;
      }
    } catch (e) {
      console.error('Payment error:', e);
      alert('Network error');
    }
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-white font-sans">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-5 md:px-15 bg-zinc-50 sm:items-start">
       
        {/* Hero section */}
        <div className="flex flex-col w-full justify-center items-center">
          <span className="inline-flex items-center px-5 py-5 rounded-full bg-[#D9CCC6]">
            <Coffee className="h-12 w-12 text-zinc-600" />
          </span>

          <div className="flex flex-col w-full justify-center items-center text-center mt-5 space-y-2">
            <div className="flex flex-col items-center gap-2 mb-10">
              <h1 className="text-lg font-semibold text-black">Elise - Full Stack Developer</h1>
              <p className="text-md text-black">Building website, mobile app and side projects.</p>
            </div>

            <div className="w-full bg-amber-50 border border-amber-200 text-amber-800 text-sm text-center px-4 py-2 rounded-lg">
              <p>Demo project · Stripe test mode · No real charges</p>

              <p className="font-semibold text-zinc-700 my-3">💳 Test cards</p>
              <div className="flex flex-col gap-2">
                {testCards.map(({ card, label }) => (
                  <div key={card} className="flex justify-between items-center">
                    <code className="text-zinc-600">{card}</code>
                    <span className="text-zinc-500">{label}</span>
                  </div>
                ))}
                <p className="text-zinc-400 mt-2">Any future date · Any CVC · Any ZIP</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stripe Section */}
        <div className="flex flex-col mt-5 items-center gap-6 bg-white border border-gray-300 rounded-lg w-full text-center sm:items-start sm:text-left">
          <div className="p-6 w-full">
            <div className="grid grid-cols-3 gap-4 mb-4">
              {/* Amount */}
              {amounts.map((amount, idx) => (
                <div key={idx} className={`rounded-lg text-white px-5 py-2 text-center hover:cursor-pointer hover:shadow-md hover:text-black ${amountSelected === amount? 'bg-[#C57B57]' : 'bg-[#DDAD95]'}`} 
                  onClick={() => {
                    setAmountSelected(amount);
                    setCustomAmount(""); // Clear custom amount when a predefined amount is selected
                    console.log(`Selected amount: ${amount}`)
                  }}
                >
                  <p>${amount}</p>
                </div>
              ))}
            </div>
            
            {/* Custom Amount */}
            <div className="flex flex-row items-center gap-2 mb-4">
              <p className="text-lg text-gray-600">$</p>
              <input className="border border-gray-300 text-gray-900 rounded-lg w-full p-2" type="text" inputMode="decimal" value={customAmount} onChange={handleCustomAmount} placeholder="Enter a custom amount"/>
            </div>
                        
            {/* Stripe */}
            <div className="flex flex-col items-center gap-4 mt-10">
              {errorMsg && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">{errorMsg}</div>}

              <button 
                className={`text-center text-gray-900 bg-[#D9CCC6] font-semibold shadow-lg rounded-lg w-50 md:w-75 p-2 ${!(amountSelected || customAmount) ? 'opacity-50 cursor-not-allowed' : ' hover:cursor-pointer'}`}
                disabled={!(amountSelected || customAmount)}
                onClick={handlePayment}
              > 
                Make a donation - ${amountSelected ?? customAmount}
              </button>
              <div className="flex flex-row items-center gap-2 text-sm text-gray-600">
                <LockKeyhole className="h-4 w-4 text-zinc-600"/>
                <p>Secured by Stripe · No account needed</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
