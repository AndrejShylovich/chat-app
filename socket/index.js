import { runApp } from "./app.js";
import { socketLog } from "./utils/logger.js";

socketLog("Запуск сокет-сервера");

const app = runApp({
  port: process.env.PORT || 3000,
  corsOrigin: process.env.CORS_ORIGIN || "http://localhost:5173",
});
