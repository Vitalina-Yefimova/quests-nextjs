'use client';

import { useState } from "react";
import { phoneAuth } from '@/actions/auth';
import { phoneAuthSchema, codeVerificationSchema, type PhoneAuthFormValues, type CodeVerificationFormValues } from './schemas/authSchemas';
import BaseForm from '@/components/generics/forms/BaseForm';

export default function PhoneAuthForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const [step, setStep] = useState<"phone" | "code">("phone");
  const [phone, setPhone] = useState("");

  const handleSendOtp = async (data: PhoneAuthFormValues) => {
    const result = await phoneAuth(data, 'phone', data.phone);
    if (result.success) {
      setPhone(data.phone);
      setStep("code");
    } else {
      throw new Error(result.error || "Failed to send code");
    }
  };

  const handleVerifyCode = async (data: CodeVerificationFormValues) => {
    const result = await phoneAuth(data, 'code', phone);
    if (result.success) {
      onSuccess();
    } else {
      throw new Error(result.error || "Invalid code");
    }
  };

  if (step === "phone") {
    const phoneFields = [
      { name: "phone", label: "Phone Number", type: "tel" },
    ];

    return (
      <div className="space-y-4">
        <BaseForm
          fields={phoneFields}
          schema={phoneAuthSchema}
          submitText="Send Code"
          onSubmit={handleSendOtp}
          defaultValues={{}}
        />
      </div>
    );
  }

  const codeFields = [
    { name: "code", label: "Enter Code", type: "text", max: 6 },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Enter Code</h2>
      <p className="text-gray-600">Code sent to {phone}</p>
      
      <BaseForm
        fields={codeFields}
        schema={codeVerificationSchema}
        submitText="Verify Code"
        onSubmit={handleVerifyCode}
        defaultValues={{}}
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
