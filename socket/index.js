const { Server } = require("socket.io");

const io = new Server({ cors: "http://localhost:5173" });

let onlineUsers = [];

console.log("Запуск сокетов")

io.on("connection", (socket) => {
  console.log("Сокеты: Соединение сокета ", socket.id)
  socket.on("addNewUser", (userId) => {
    console.log("Сокет : Добавление нового пользователя")
    !onlineUsers.some((user) => user.userId === userId) &&
      onlineUsers.push({ userId, socketId: socket.id });
    io.emit("getOnlineUsers", onlineUsers);
  });

  socket.on("sendMessage", (message) => {
    console.log("Сокеты : Отправка сообщения")
    const user = onlineUsers.find((user) => user.userId === message.recipientId);
    if (user) {
      io.to(user.socketId).emit("getMessage", message);
      io.to(user.socketId).emit("getNotification", {
        senderId: message.senderId,
        isRead: false,
        date: new Date(),
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("Сокеты : Дисконнект пользователя ", socket.id)
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    io.emit("getOnlineUsers", onlineUsers);
  });
});

io.listen(3000);

123123