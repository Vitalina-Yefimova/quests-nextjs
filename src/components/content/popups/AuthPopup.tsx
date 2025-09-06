'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import BasePopup from "@/components/generics/popups/BasePopup";
import EmailAuthForm from "@/components/content/forms/EmailAuthForm";
import PhoneAuthForm from "@/components/content/forms/PhoneAuthForm";

export default function AuthPopup({
  onClose,
  onLoginSuccess,
  initialAuthType = "login",
  initialMethod = "phone",
}: {
  onClose: () => void;
  onLoginSuccess?: () => void;
  initialAuthType?: "login" | "register";
  initialMethod?: "email" | "phone";
}) {
  const [authType, setAuthType] = useState<"login" | "register">(
    initialAuthType
  );
  const [method, setMethod] = useState<"email" | "phone">(initialMethod);
  const router = useRouter();

  const handleSuccess = () => {
    if (authType === "login" || method === "phone") {
      router.push("/");
      onLoginSuccess?.();
    } else {
      router.push("/check-email");
    }
    onClose();
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
    <BasePopup onClose={onClose}>
      <h2 className="text-3xl font-bold pb-4 pt-1 text-center text-white">
        {authType === "login" ? "Log in" : "Sign up"}
      </h2>

      <div className="w-full max-w-[400px] text-[#E5E5E5] relative pt-2">
        <div className="flex justify-between items-center pb-3">
          <span className="text-white font-bold text-sm">
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
    </BasePopup>
  );
}
