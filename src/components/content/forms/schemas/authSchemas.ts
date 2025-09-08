import { z } from "zod";
import { emailValidation, passwordValidation, phoneValidation, nameValidation } from "@/utils/schemas";

export const signInSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
});

export const signUpSchema = z
  .object({
    firstName: nameValidation,
    lastName: nameValidation,
    email: emailValidation,
    phone: phoneValidation,
    password: passwordValidation,
    confirmPassword: z.string(),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

export const phoneAuthSchema = z.object({
  phone: phoneValidation,
});

export const codeVerificationSchema = z.object({
  code: z.string().length(6, "Code must be 6 digits"),
});

export type SignInFormValues = z.infer<typeof signInSchema>;
export type SignUpFormValues = z.infer<typeof signUpSchema>;
export type PhoneAuthFormValues = z.infer<typeof phoneAuthSchema>;
export type CodeVerificationFormValues = z.infer<typeof codeVerificationSchema>;
