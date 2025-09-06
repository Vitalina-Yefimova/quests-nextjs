'use client';

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function CheckEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [countdown, setCountdown] = useState(8);
  
  const email = searchParams.get('email');
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      router.push("/");
    }, 8000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-md p-6 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-4">Check your email</h1>
        </div>
        
        <div className="text-gray-700 mb-6">
          <p className="mb-3">
            Thanks for signing up! We've sent a verification link to your email address.
          </p>
          {email && (
            <p className="font-semibold text-orange-600 bg-orange-50 px-3 py-2 rounded-lg mb-3">
              {email}
            </p>
          )}
          <p className="text-sm">
            Please check your email and click the verification link to activate your account.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => router.push("/")}
            className="w-full px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition font-medium"
          >
            Back to Home
          </button>
          
          <button
            onClick={() => router.push("/auth?type=login")}
            className="w-full px-6 py-2 text-orange-500 border border-orange-500 rounded-full hover:bg-orange-50 transition"
          >
            Already verified? Sign in
          </button>
        </div>

        <p className="text-sm text-gray-400 mt-4">
          You'll be redirected automatically in {countdown} seconds...
        </p>
      </div>
    </div>
  );
}
