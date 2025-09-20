'use client';

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BasePopup from "@/components/generics/popups/BasePopup";
import EmailAuthForm from "@/components/content/forms/EmailAuthForm";
import PhoneAuthForm from "@/components/content/forms/PhoneAuthForm";

export default function AuthPopup({
  onClose,
  onLoginSuccess,
  initialAuthType = "login",
  initialMethod = "phone",
  useUrlParams = false,
}: {
  onClose?: () => void;
  onLoginSuccess?: () => void;
  initialAuthType?: "login" | "register";
  initialMethod?: "email" | "phone";
  useUrlParams?: boolean;
}) {
  const [authType, setAuthType] = useState<"login" | "register">(
    initialAuthType
  );
  const [method, setMethod] = useState<"email" | "phone">(initialMethod);
  const [showEmailSent, setShowEmailSent] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (useUrlParams) {
      const type = searchParams.get('type');
      const methodParam = searchParams.get('method');
      
      if (type === 'login') {
        setAuthType('login');
      } else if (type === 'register') {
        setAuthType('register');
      }
      
      if (methodParam === 'email') {
        setMethod('email');
      } else if (methodParam === 'phone') {
        setMethod('phone');
      }
    }
  }, [searchParams, useUrlParams]);

  const handleSuccess = () => {
    if (authType === "login" || method === "phone") {
      onLoginSuccess?.();
      if (!useUrlParams && onClose) {
        onClose();
      }
      router.push("/");
    } else {
      setShowEmailSent(true);
    }
  };

  const switchToPhone = () => {
    setMethod("phone");
    if (useUrlParams) {
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('method', 'phone');
      window.history.replaceState({}, '', newUrl.toString());
    }
  };
  
  const switchToEmail = () => {
    setMethod("email");
    if (useUrlParams) {
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('method', 'email');
      window.history.replaceState({}, '', newUrl.toString());
    }
  };

  const switchAuthType = (newType: "login" | "register") => {
    setAuthType(newType);
    if (useUrlParams) {
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('type', newType);
      window.history.replaceState({}, '', newUrl.toString());
    }
  };

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

  const content = (
    <>
      <h2 className="text-3xl font-bold pb-4 pt-1 text-center text-white">
        {authType === "login" ? "Log in" : "Sign up"}
      </h2>

      <div className="w-full max-w-[400px] relative pt-2 pb-8 text-[#E5E5E5]">
        <div className="flex justify-between items-center pb-3">
          <span className="font-bold text-sm text-white">
            {method === "phone" ? "Phone" : "Email"}
          </span>
          <button
            onClick={() =>
              method === "phone" ? switchToEmail() : switchToPhone()
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

        {showEmailSent && (
          <div className="mt-3 p-2 bg-green-500/20 border border-green-500/30 rounded-lg">
            <p className="text-green-400 text-xs text-center">
              Check your email! We've sent a verification link to activate your account.
            </p>
          </div>
        )}

        <div className="pt-2 text-sm text-center">
          {authType === "login" ? (
            <p>
              Don't have an account?{" "}
              <button
                onClick={() => switchAuthType("register")}
                className="text-[#F28A0F] font-bold"
              >
                Sign up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button
                onClick={() => switchAuthType("login")}
                className="text-[#F28A0F] font-bold"
              >
                Log in
              </button>
            </p>
          )}
        </div>
      </div>
    </>
  );

  if (useUrlParams) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[#1E1E1E]">
        <div className="max-w-md w-full bg-[#1D1C1C] rounded-2xl shadow-md p-6">
          {content}
        </div>
      </div>
    );
  }

  return (
    <BasePopup onClose={onClose || undefined}>
      {content}
    </BasePopup>
  );
}
