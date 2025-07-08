import { socketLog } from "../utils/logger.js";
import { isValidUserId } from "../utils/validators.js";
import { usersToArray } from "../utils/helpers.js";

const hasUser = (users, userId) => users.has(userId);

const addUser = (users, userId, socketId) =>
  new Map(users).set(userId, { socketId, joinedAt: new Date() });

const removeUserBySocketId = (users, socketId) => {
  const userToRemove = [...users].find(
    ([_, user]) => user.socketId === socketId
  );
  if (!userToRemove) return users;

  const newUsers = new Map(users);
  newUsers.delete(userToRemove[0]);
  return newUsers;
};

const createAddUserHandler = (io, usersState) => (socket) => (userId) => {
  socketLog(`Добавление пользователя: ${userId}`);

  if (!isValidUserId(userId)) {
    socketLog(`Некорректный userId от сокета ${socket.id}`);
    return;
  }

  const currentUsers = usersState.get();

  if (hasUser(currentUsers, userId)) {
    socketLog(`Пользователь ${userId} уже онлайн`);
    return;
  }

  const newUsers = addUser(currentUsers, userId, socket.id);
  usersState.set(newUsers);
  io.emit("getOnlineUsers", usersToArray(newUsers));

  socketLog(`Пользователь ${userId} добавлен. Всего онлайн: ${newUsers.size}`);
};

const createDisconnectHandler = (io, usersState) => (socket) => () => {
  socketLog(`Отключение сокета: ${socket.id}`);

  const currentUsers = usersState.get();
  const newUsers = removeUserBySocketId(currentUsers, socket.id);

  if (newUsers.size === currentUsers.size) {
    socketLog(`Пользователь с сокетом ${socket.id} не найден`);
    return;
  }

  usersState.set(newUsers);
  io.emit("getOnlineUsers", usersToArray(newUsers));
  socketLog(`Пользователь удален. Всего онлайн: ${newUsers.size}`);
};

export {
  hasUser,
  addUser,
  removeUserBySocketId,
  createAddUserHandler,
  createDisconnectHandler,
};
