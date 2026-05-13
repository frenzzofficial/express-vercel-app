import dotenv from "dotenv";
import { z } from "zod";
dotenv.config();

// ✅ Schema uses the actual env var names (with NEXT_PUBLIC_ prefix)
const envConfigSchema = z.object({
  DEMO_USER_ID: z.string().default("demo-user-1"),
  DEMO_USER_NAME: z.string().default("John Doe"),
  DEMO_USER_EMAIL: z.string().default("johndoe@gmail.com"),
  DEMO_USER_PASSWORD: z.string().default("password#1234"),
});

// ✅ Validate process.env
const parsed = envConfigSchema.safeParse(process.env);

if (!parsed.success) {
  throw new Error(
    `❌ Invalid demo User environment variables:\n${parsed.error.issues
      .map((i) => `• ${i.path.join(".")}: ${i.message}`)
      .join("\n")}`
  );
}

// ✅ Map validated vars to clean keys
export const envDemoUserConfig = Object.freeze({
  DEMO_USER_ID: parsed.data.DEMO_USER_ID,
  DEMO_USER_NAME: parsed.data.DEMO_USER_NAME,
  DEMO_USER_EMAIL: parsed.data.DEMO_USER_EMAIL,
  DEMO_USER_PASSWORD: parsed.data.DEMO_USER_PASSWORD,
});

// ✅ Optional: Type-safe config
export type EnvDemoUserConfig = typeof envDemoUserConfig;
