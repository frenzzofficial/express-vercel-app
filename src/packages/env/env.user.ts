import dotenv from "dotenv";
import { z } from "zod";
dotenv.config();

// ✅ Schema uses the actual env var names (with NEXT_PUBLIC_ prefix)
const envConfigSchema = z.object({
  DEFAULT_USER_ID: z.string().default("default-user-1"),
  DEFAULT_USER_FULLNAME: z.string().default("John Doe"),
  DEFAULT_USER_EMAIL: z.string().default("johndoe@gmail.com"),
  DEFAULT_USER_PASSWORD: z.string().default("password#1234"),
});

// ✅ Validate process.env
const parsed = envConfigSchema.safeParse(process.env);

if (!parsed.success) {
  throw new Error(
    `❌ Invalid default User environment variables:\n${parsed.error.issues
      .map((i) => `• ${i.path.join(".")}: ${i.message}`)
      .join("\n")}`
  );
}

// ✅ Map validated vars to clean keys
export const envDefaultUserConfig = Object.freeze({
  DEFAULT_USER_ID: parsed.data.DEFAULT_USER_ID,
  DEFAULT_USER_FULLNAME: parsed.data.DEFAULT_USER_FULLNAME,
  DEFAULT_USER_EMAIL: parsed.data.DEFAULT_USER_EMAIL,
  DEFAULT_USER_PASSWORD: parsed.data.DEFAULT_USER_PASSWORD,
});

// ✅ Optional: Type-safe config
export type EnvDefaultUserConfig = typeof envDefaultUserConfig;
