'use client';

import { useSearchParams, useRouter } from "next/navigation";
import BasePopup from "@/components/generics/popups/BasePopup";
import BaseForm from "@/components/generics/forms/BaseForm";
import { z } from "zod";
import { useState } from "react";
import Button from "@/components/generics/button/Button";
import { resetPassword } from "@/actions/auth";

const schema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export default function ResetPasswordPopup() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [isSuccess, setSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: z.infer<typeof schema>) => {
    const result = await resetPassword(token!, data.password);
    
    if (!result.success) {
      throw new Error(result.error || "Failed to reset password");
    }
    
    setSuccess(true);
  };

  const handleClose = () => {
    router.push("/");
  };

  if (!token) {
    return (
      <BasePopup onClose={handleClose}>
        <p className="text-red-500 text-center">Invalid or missing token</p>
      </BasePopup>
    );
  }

  return (
    <BasePopup onClose={handleClose}>
      <h2 className="text-xl font-bold text-center pb-2 text-white">
        Reset Password
      </h2>
      <p className="text-sm text-center text-[#E5E5E5] pb-6">
        Enter your new password and confirm it.
      </p>
      <BaseForm
        schema={schema}
        onSubmit={handleSubmit}
        fields={[
          { name: "password", label: "New Password", type: "password" },
          {
            name: "confirmPassword",
            label: "Confirm Password",
            type: "password",
          },
        ]}
        submitText="Reset Password"
        successMessage="Password updated successfully. You can now log in."
        resetOnSuccess
        isSuccess={isSuccess}
      />

      {isSuccess && (
        <div className="pt-6 text-center">
          <Button
            onClick={() => router.push("/")}
            className="w-[180px] h-[45px] mt-2 rounded-full bg-[#F28A0F] text-white font-bold text-sm cursor-none"
          >
            Back to Home
          </Button>
        </div>
      )}
    </BasePopup>
  );
}
