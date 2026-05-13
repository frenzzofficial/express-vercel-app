import { signupSchema } from "../../packages/schemas/schema.auth";

export const validateSignupCredentials = (data: unknown) => {
  const validatedData = signupSchema.safeParse(data);

  if (!validatedData.success) {
    const issue = validatedData.error.issues[0];

    return {
      success: false as const,

      field: issue.path[0]?.toString() || "unknown",

      message: issue.message,
    };
  }

  return {
    success: true as const,

    data: validatedData.data,
  };
};
