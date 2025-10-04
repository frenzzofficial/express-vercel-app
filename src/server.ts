import dotenv from "dotenv";
import createApp from "./app";
import { envAppConfig } from "./libs/env/env.app";

// ✅ Load environment variables early
dotenv.config();

// ✅ Validate essential env variables
const { APP_PORT, API_PATH } = envAppConfig;

if (!APP_PORT || !API_PATH) {
  console.error("❌ Missing required environment configuration: APP_PORT or API_PATH");
  process.exit(1);
}

// ✅ Start server with safe async handling
const startServer = async (): Promise<void> => {
  try {
    const app = await createApp();
    // ✅ Enable trust proxy for production
    if (process.env.NODE_ENV === "production") {
      app.set("trust proxy", 1); // if behind proxy like Nginx or Heroku
    }

    const server = app.listen(APP_PORT, () => {
      console.log(`🚀 Server running on port http://localhost:${APP_PORT}`);
      console.log(`📚 API docs available at http://localhost:${APP_PORT}/api/documentation`);
    });

    // ✅ Graceful shutdown
    const shutdown = (signal: string) => {
      console.log(`🛑 Received ${signal}. Shutting down gracefully...`);
      server.close(() => {
        console.log("✅ Server closed.");
        process.exit(0);
      });
    };

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));
  } catch (err) {
    console.error("❌ Failed to start server:", err instanceof Error ? err.message : err);
    process.exit(1);
  }
};

void startServer();
