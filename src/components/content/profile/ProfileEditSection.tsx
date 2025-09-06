'use client';

import { useState } from "react";
import BaseForm from "@/components/generics/forms/BaseForm";
import { User } from "@/utils/interfaces";
import { updateUser } from "@/actions/user";
import { sendEmailVerification } from "@/actions/auth";
import { authSchema, type AuthFormValues } from "@/components/content/forms/schemas/authSchema";

interface ProfileEditSectionProps {
  user: User;
  onUserUpdate: (updatedUser: User) => void;
}

export default function ProfileEditSection({ user, onUserUpdate }: ProfileEditSectionProps) {
  const [isSuccess, setSuccess] = useState(false);
  const [isVerifying, setVerifying] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (data: AuthFormValues) => {
    const payload: any = { ...data };
    
    if (data.email && data.email !== user.email) {
      payload.newEmail = data.email;
      delete payload.email;
    }

    const result = await updateUser(user.id, payload);

    if (!result.success) {
      if (result.error?.includes("already")) {
        setEmailError("This email is already in use.");
        return;
      }
      throw new Error(result.error || "Failed to update profile");
    }

    onUserUpdate(result.user!);
    setSuccess(true);
    setEmailError(null);
    setEmailSent(false);
  };

  const sendVerification = async () => {
    setVerifying(true);
    setEmailError(null);
    setEmailSent(false);

    const result = await sendEmailVerification(user.newEmail || user.email || '');

    if (!result.success) {
      setEmailError(result.error || "Failed to send verification email");
    } else {
      setEmailSent(true);
    }

    setVerifying(false);
  };

  const showVerifyButton = !!(user?.newEmail && !user?.emailVerified);

  const fields = [
    { name: "firstName", label: "First Name" },
    { name: "lastName", label: "Last Name" },
    {
      name: "phone",
      label: "Phone",
      disabled: user.authMethod === "phone",
    },
    {
      name: "email",
      label: "Email",
      disabled: user.emailVerified && !user.newEmail,
      showVerifyButton,
      onVerifyClick: sendVerification,
      isVerifying,
    },
  ];

  return (
    <>
      <BaseForm
        fields={fields}
        schema={authSchema}
        submitText="Save Changes"
        onSubmit={handleSubmit}
        defaultValues={{
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          phone: user.phone || "",
          email: user.newEmail || user.email || "",
        }}
        isSuccess={isSuccess}
        successMessage="Changes saved successfully"
      />

      {emailError && (
        <p className="text-red-500 text-sm text-center mt-2">{emailError}</p>
      )}

      {emailSent && (
        <p className="text-green-500 text-sm text-center mt-2">
          Verification email sent! Please check your inbox.
        </p>
      )}
    </>
  );
}
