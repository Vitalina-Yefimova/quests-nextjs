import { z } from "zod";

export const authSchema = z
  .object({
    type: z.enum(["login", "register", "phone", "code"]).optional(),
    email: z.email("Invalid email").optional(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+])[A-Za-z\d@$!%*?&+]{8,}$/,
        "Password must contain uppercase, lowercase, number, and special character"
      )
      .optional(),
    confirmPassword: z.string().optional(),
    firstName: z.string().min(2, "First name is required").optional(),
    lastName: z.string().min(2, "Last name is required").optional(),
    phone: z.string().regex(/^\+?\d{10,15}$/, "Invalid phone number").optional(),
    code: z.string().length(6, "Code must be 6 digits").optional(),
  })
  .refine(
    (formData) => formData.type !== "login" || (!!formData.email && !!formData.password),
    { message: "Required fields missing", path: ["type"] }
  )
  .refine(
    (formData) =>
      formData.type !== "register" ||
      (formData.firstName &&
        formData.lastName &&
        formData.email &&
        formData.phone &&
        formData.password &&
        formData.confirmPassword),
    { message: "Required fields missing", path: ["type"] }
  )
  .refine((formData) => formData.type !== "phone" || !!formData.phone, {
    message: "Required fields missing",
    path: ["type"],
  })
  .refine(
    (formData) => formData.type !== "code" || (!!formData.code && !!formData.phone),
    { message: "Required fields missing", path: ["type"] }
  )
  .refine(
    (formData) =>
      formData.type !== "register" ||
      !formData.confirmPassword ||
      formData.password === formData.confirmPassword,
    { message: "Passwords do not match", path: ["confirmPassword"] }
  );

export type AuthFormValues = z.infer<typeof authSchema>;
