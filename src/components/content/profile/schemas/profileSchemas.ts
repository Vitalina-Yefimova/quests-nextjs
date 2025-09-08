import { z } from "zod";
import { emailValidation, phoneValidation, nameValidation, passwordValidation } from "@/utils/schemas";

export const profileEditSchema = z.object({
  firstName: nameValidation,
  lastName: nameValidation,
  phone: phoneValidation,
  email: emailValidation.optional(),
});

export const changePasswordSchema = z.object({
  oldPassword: passwordValidation,
  newPassword: passwordValidation,
  confirmPassword: passwordValidation,
}).refine(
  (data) => data.newPassword === data.confirmPassword,
  {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }
);

export type ProfileEditFormValues = z.infer<typeof profileEditSchema>;
export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
