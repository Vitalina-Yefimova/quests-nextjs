'use client';

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import EmailAuthForm from "@/components/content/forms/EmailAuthForm";
import PhoneAuthForm from "@/components/content/forms/PhoneAuthForm";

export default function AuthPage() {
  const [authType, setAuthType] = useState<"login" | "register">("login");
  const [method, setMethod] = useState<"email" | "phone">("email");
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const type = searchParams.get('type');
    const methodParam = searchParams.get('method');
    
    if (type === 'register') {
      setAuthType('register');
    }
    
    if (methodParam === 'phone') {
      setMethod('phone');
    }
  }, [searchParams]);

  const handleSuccess = () => {
    if (authType === "login" || method === "phone") {
      router.push("/");
    } else {
      router.push("/check-email");
    }
  };

  const switchToPhone = () => setMethod("phone");
  const switchToEmail = () => setMethod("email");

  const renderForm = () => {
    const props = {
      authType,
      onSuccess: handleSuccess,
      switchToPhone,
      switchToEmail,
    };

    return method === "phone" ? (
      <PhoneAuthForm {...props} />
    ) : (
      <EmailAuthForm {...props} />
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-3xl font-bold pb-4 pt-1 text-center text-gray-800">
          {authType === "login" ? "Log in" : "Sign up"}
        </h2>

        <div className="w-full max-w-[400px] text-gray-700 relative pt-2">
          <div className="flex justify-between items-center pb-3">
            <span className="text-gray-800 font-bold text-sm">
              {method === "phone" ? "Phone" : "Email"}
            </span>
            <button
              onClick={() =>
                setMethod((prev) => (prev === "phone" ? "email" : "phone"))
              }
              className="text-sm text-[#F28A0F] font-semibold"
            >
              {authType === "login"
                ? method === "phone"
                  ? "Log in with email"
                  : "Log in with phone"
                : method === "phone"
                ? "Sign up with email"
                : "Sign up with phone"}
            </button>
          </div>

          <div className="text-center">{renderForm()}</div>

          <div className="pt-4 text-sm text-center">
            {authType === "login" ? (
              <p>
                Don't have an account?{" "}
                <button
                  onClick={() => setAuthType("register")}
                  className="text-[#F28A0F] font-bold"
                >
                  Sign up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <button
                  onClick={() => setAuthType("login")}
                  className="text-[#F28A0F] font-bold"
                >
                  Log in
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
