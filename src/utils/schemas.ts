import { z } from "zod";

export const emailValidation = z.email("Invalid email");

export const passwordValidation = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+])[A-Za-z\d@$!%*?&+]{8,}$/,
    "Password must contain uppercase, lowercase, number, and special character"
  );

export const phoneValidation = z.string().regex(/^\+?\d{10,15}$/, "Invalid phone number");

export const nameValidation = z.string().min(2, "Name must be at least 2 characters");

