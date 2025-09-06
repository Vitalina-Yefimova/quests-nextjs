'use client';

import { useState } from "react";
import BaseForm from "@/components/generics/forms/BaseForm";
import { z } from "zod";
import { User } from "@/utils/interfaces";
import { changePassword } from "@/actions/user";

const schema = z
  .object({
    oldPassword: z.string().min(6, "Old password is required"),
    newPassword: z.string().min(6, "New password is required"),
    confirmPassword: z.string().min(6, "Confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

interface ChangePasswordSectionProps {
  user: User;
}

export default function ChangePasswordSection({ user }: ChangePasswordSectionProps) {
  const [isSuccess, setSuccess] = useState(false);

  const handleSubmit = async (data: z.infer<typeof schema>) => {
    if (!user || !user.id) throw new Error("User is not authenticated");

    const result = await changePassword(user.id, {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    });

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
      schema={schema}
      submitText="Change Password"
      onSubmit={handleSubmit}
      isSuccess={isSuccess}
      successMessage="Password changed successfully"
      resetOnSuccess={true}
    />
  );
}
