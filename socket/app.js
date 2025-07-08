import { createSocketServer } from "./server.js";
import { socketLog } from "./utils/logger.js";

const setupGracefulShutdown = (server) => {
  const shutdownHandler = (signal) => () => {
    socketLog(`Получен сигнал ${signal}, завершаем работу...`);
    server.stop();
    process.exit(0);
  };

  process.on("SIGINT", shutdownHandler("SIGINT"));
  process.on("SIGTERM", shutdownHandler("SIGTERM"));
};

const createApp = (config) => {
  const server = createSocketServer(config);
  setupGracefulShutdown(server);
  return server;
};

const runApp = (config) => {
  const app = createApp(config);
  app.start();
  return app;
};

export { createApp, runApp };
