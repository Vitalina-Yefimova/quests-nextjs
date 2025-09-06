'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import VerifyContent from "@/components/generics/verify/VerifyContent";

export default function VerifyPage() {
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSuccess = () => {
    setShowSuccess(true);
    
    setTimeout(() => {
      router.push("/");
    }, 3000);
  };

  const handleError = () => {
    setTimeout(() => {
      router.push("/auth?type=register");
    }, 3000);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-md p-6 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-4 text-gray-800">Email Verified!</h1>
          </div>
          
          <div className="text-gray-700 mb-6">
            <p className="mb-3">
              Your email has been successfully verified.
            </p>
            <p className="text-sm">
              You can now sign in to your account.
            </p>
          </div>

          <button
            onClick={() => router.push("/")}
            className="w-full px-6 py-3 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition font-medium"
          >
            Continue to Home
          </button>

          <p className="text-sm text-gray-400 mt-4">
            Redirecting automatically in 3 seconds...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-md p-6 text-center">
        <VerifyContent
          onSuccess={handleSuccess}
          onClose={handleError}
        />
      </div>
    </div>
  );
}
