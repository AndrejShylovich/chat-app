import { socketLog } from "../utils/logger.js";
import { isValidMessage } from "../utils/validators.js";
import { createNotification } from "../services/notification.js";

const findUserByRecipientId = (users, recipientId) => users.get(recipientId);

const emitToSocket = (io, socketId, event, data) => {
  io.to(socketId).emit(event, data);
};

const sendMessageToUser = (io, user, message) => {
  emitToSocket(io, user.socketId, "getMessage", message);
  emitToSocket(
    io,
    user.socketId,
    "getNotification",
    createNotification(message.senderId, message.id)
  );
};

const createSendMessageHandler = (io, usersState) => (message) => {
  socketLog(
    `Отправка сообщения от ${message.senderId} к ${message.recipientId}`
  );

  if (!isValidMessage(message)) {
    socketLog("Получено некорректное сообщение");
    return;
  }

  const recipient = findUserByRecipientId(
    usersState.get(),
    message.recipientId
  );

  if (!recipient) {
    socketLog(`Получатель ${message.recipientId} не в сети`);
    return;
  }

  sendMessageToUser(io, recipient, message);
  socketLog(`Сообщение доставлено пользователю ${message.recipientId}`);
};

export { createSendMessageHandler, sendMessageToUser, emitToSocket };
