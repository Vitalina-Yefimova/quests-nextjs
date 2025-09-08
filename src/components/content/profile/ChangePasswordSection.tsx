'use client';

import { useState } from "react";
import BaseForm from "@/components/generics/forms/BaseForm";
import { User } from "@/utils/interfaces";
import { changePassword } from "@/actions/user";
import { changePasswordSchema, type ChangePasswordFormValues } from "./schemas/profileSchemas";

interface ChangePasswordSectionProps {
  user: User;
}

export default function ChangePasswordSection({ user }: ChangePasswordSectionProps) {
  const [isSuccess, setSuccess] = useState(false);

  const handleSubmit = async (data: ChangePasswordFormValues) => {
    const result = await changePassword(data);

    if (!result.success) {
      throw new Error(result.error || "Failed to change password");
    }

    setSuccess(true);
  };

  const fields = [
    { name: "oldPassword", label: "Old Password", type: "password" },
    { name: "newPassword", label: "New Password", type: "password" },
    { name: "confirmPassword", label: "Confirm Password", type: "password" },
  ];

  return (
    <BaseForm
      fields={fields}
      schema={changePasswordSchema}
      submitText="Change Password"
      onSubmit={handleSubmit}
      isSuccess={isSuccess}
      successMessage="Password changed successfully"
      resetOnSuccess={true}
    />
  );
}
