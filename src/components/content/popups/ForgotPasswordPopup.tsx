'use client';

import BasePopup from "@/components/generics/popups/BasePopup";
import BaseForm from "@/components/generics/forms/BaseForm";
import { z } from "zod";
import { useState } from "react";
import { sendResetPasswordEmail } from "@/actions/auth";

const schema = z.object({
  email: z.email("Invalid email"),
});

export default function ForgotPasswordPopup({
  onClose,
}: {
  onClose: () => void;
}) {
  const [isSuccess, setSuccess] = useState(false);

  const handleSubmit = async (data: z.infer<typeof schema>) => {
    const result = await sendResetPasswordEmail(data.email);
    
    if (!result.success) {
      throw new Error(result.error || "Failed to send reset link");
    }

    setSuccess(true);
  };

  return (
    <BasePopup onClose={onClose}>
      <h2 className="text-xl font-bold text-center pb-4 text-white">
        Forgot your password?
      </h2>
      <p className="text-sm text-center text-[#E5E5E5] pb-6">
        Enter your email and we'll send you a link to reset it.
      </p>
      <BaseForm
        schema={schema}
        onSubmit={handleSubmit}
        fields={[{ name: "email", label: "Email" }]}
        submitText="Send reset link"
        successMessage="Check your email for the reset link"
        resetOnSuccess
        isSuccess={isSuccess}
      />
    </BasePopup>
  );
}
