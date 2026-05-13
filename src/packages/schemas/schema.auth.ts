import { z } from "zod";

/* -------------------------------------------------------------------------- */
/*                               SIGNUP SCHEMA                                */
/* -------------------------------------------------------------------------- */

export const signupSchema = z.object({
  email: z
    .string({
      error: "Email is required",
    })
    .trim()
    .toLowerCase()
    .email("Invalid email address"),

  password: z
    .string({
      error: "Password is required",
    })
    .trim()
    .min(6, "Password must be at least 6 characters")
    .max(128, "Password must not exceed 128 characters"),

  name: z
    .string({
      error: "Name is required",
    })
    .trim()
    .min(2, "Name is too short")
    .max(50, "Name is too long"),
});

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

export type SignupSchemaInput = z.infer<typeof signupSchema>;

export type SignupSchemaOutput = z.output<typeof signupSchema>;
