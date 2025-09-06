'use client';

import { useEffect, useState } from "react";
import { verifyEmail } from "@/actions/auth";

interface VerifyContentProps {
  onSuccess: () => void;
  onClose: () => void;
}

export default function VerifyContent({
  onSuccess,
  onClose,
}: VerifyContentProps) {
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (!token) {
      setStatus("error");
      return;
    }

    verifyEmail(token)
      .then((result) => {
        if (result.success) {
          setStatus("success");
          setTimeout(() => {
            onSuccess?.();
          }, 2000);
        } else {
          setStatus("error");
        }
      })
      .catch(() => {
        setStatus("error");
      });
  }, [onSuccess]);

  return (
    <div>
      {status === "loading" && (
        <div className="text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-orange-500 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Verifying your email...</h1>
          <p className="text-gray-600">Please wait while we verify your email address.</p>
        </div>
      )}
      {status === "success" && (
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Verification successful!</h1>
          <p className="text-gray-600">Your email has been verified successfully.</p>
        </div>
      )}
      {status === "error" && (
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Verification failed</h1>
          <p className="text-gray-600 mb-4">
            The verification link is invalid or has expired.
          </p>
          <p className="text-sm text-gray-500">
            Please try again.
          </p>
        </div>
      )}
    </div>
  );
}
