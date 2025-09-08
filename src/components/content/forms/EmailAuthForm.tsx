'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import BaseForm from '@/components/generics/forms/BaseForm';
import ForgotPasswordPopup from '@/components/content/popups/ForgotPasswordPopup';
import { emailAuth } from '@/actions/auth';
import { signInSchema, signUpSchema, type SignInFormValues, type SignUpFormValues } from './schemas/authSchemas';


export default function EmailAuthForm({
  authType,
  onSuccess,
}: {
  authType: "login" | "register";
  onSuccess: () => void;
}) {
  const router = useRouter();
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleSubmit = async (data: SignInFormValues | SignUpFormValues) => {
      const result = await emailAuth(data, authType);
    
    if (!result.success) {
      throw new Error(result.error || 'Authentication failed');
    }

    if (authType === "login") {
      onSuccess();
    } else {
      const registerData = data as SignUpFormValues;
      router.push(`/check-email?email=${encodeURIComponent(registerData.email)}`);
      onSuccess();
    }
  };

  const schema = authType === "login" ? signInSchema : signUpSchema;

  const fields =
    authType === "login"
      ? [
          { name: "email", label: "Email" },
          { name: "password", label: "Password", type: "password" },
        ]
      : [
          { name: "firstName", label: "First Name" },
          { name: "lastName", label: "Last Name" },
          { name: "email", label: "Email" },
          { name: "phone", label: "Phone" },
          { name: "password", label: "Password", type: "password" },
          {
            name: "confirmPassword",
            label: "Confirm Password",
            type: "password",
          },
        ];

  return (
    <>
      <BaseForm
        schema={schema}
        submitText={authType === "login" ? "Login" : "Sign Up"}
        onSubmit={handleSubmit}
        fields={fields}
        defaultValues={{}}
      />
      {authType === "login" && (
        <div className="pt-3 text-center font-semibold">
          <button
            type="button"
            onClick={() => setShowForgotPassword(true)}
            className="text-sm text-[#F28A0F] underline"
          >
            Forgot password?
          </button>
        </div>
      )}
      {showForgotPassword && (
        <ForgotPasswordPopup onClose={() => setShowForgotPassword(false)} />
      )}
    </>
  );
}
