'use client';

import { z } from "zod";
import { useState } from "react";
import { phoneAuth } from '@/actions/auth';
import { authSchema } from './schemas/authSchema';
import BaseForm from '@/components/generics/forms/BaseForm';

export default function PhoneAuthForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [phone, setPhone] = useState("");

  const handleSendOtp = async (data: z.infer<typeof authSchema>) => {
    const result = await phoneAuth(data, 'phone', data.phone);
    if (result.success) {
      setPhone(data.phone!);
      setStep("code");
    } else {
      throw new Error(result.error || "Failed to send code");
    }
  };

  const handleVerifyCode = async (data: z.infer<typeof authSchema>) => {
    const result = await phoneAuth(data, 'code', phone);
    if (result.success) {
      onSuccess();
    } else {
      throw new Error(result.error || "Invalid code");
    }
  };

  if (step === "phone") {
    const phoneFields = [
      { name: "type", label: "Type", type: "hidden", defaultValue: "phone" },
      { name: "phone", label: "Phone Number", type: "tel" },
    ];

    return (
      <div className="space-y-4">
        <BaseForm
          fields={phoneFields}
          schema={authSchema}
          submitText="Send Code"
          onSubmit={handleSendOtp}
          defaultValues={{ type: "phone" }}
        />
      </div>
    );
  }

  const codeFields = [
    { name: "type", label: "Type", type: "hidden", defaultValue: "code" },
    { name: "phone", label: "Phone", type: "hidden", defaultValue: phone },
    { name: "code", label: "Enter Code", type: "text", max: 6 },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Enter Code</h2>
      <p className="text-gray-600">Code sent to {phone}</p>
      
      <BaseForm
        fields={codeFields}
        schema={authSchema}
        submitText="Verify Code"
        onSubmit={handleVerifyCode}
        defaultValues={{ type: "code", phone: phone }}
        showTermsCheckbox={false}
      />

      <button
        type="button"
        onClick={() => setStep("phone")}
        className="w-full text-blue-500 underline"
      >
        Back to Phone
      </button>
    </div>
  );
}
