import { Server } from "socket.io";
import { createServerConfig } from "./config/serverConfig.js";
import { createUsersState } from "./services/userState.js";
import { createConnectionHandler } from "./handlers/connection.js";
import { socketLog } from "./utils/logger.js";

const createSocketServer = (config = {}) => {
  const {
    port = 3000,
    corsOrigin = "http://localhost:5173",
    corsMethods = ["GET", "POST"],
  } = config;

  const io = new Server(createServerConfig(corsOrigin, corsMethods));
  const usersState = createUsersState();

  return {
    io,
    usersState,
    start: () => {
      io.on("connection", createConnectionHandler(io, usersState));
      io.listen(port);
      socketLog(`Сервер запущен на порту ${port}`);
    },
    stop: () => io.close(),
    getStats: () => ({
      onlineUsers: usersState.size(),
      usersList: usersState.toArray(),
    }),
  };
};

export { createSocketServer };
