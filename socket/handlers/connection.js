import { socketLog } from "../utils/logger.js";
import { createAddUserHandler, createDisconnectHandler } from "./user.js";
import { createSendMessageHandler } from "./message.js";

const createConnectionHandler = (io, usersState) => (socket) => {
  socketLog(`Новое соединение: ${socket.id}`);

  socket.on("addNewUser", createAddUserHandler(io, usersState)(socket));
  socket.on("sendMessage", createSendMessageHandler(io, usersState));
  socket.on("disconnect", createDisconnectHandler(io, usersState)(socket));
};

export { createConnectionHandler };
