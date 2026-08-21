import { z } from "zod";

export const PasswordSchema = z
  .string("Password must be a string.")
  .nonempty("Password cannot be empty.");

export const StrictPasswordSchema = PasswordSchema.min(
  8,
  "Password must be at least 8 characters.",
)
  .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
  .regex(/\d/, "Password must contain at least one digit.");
