const createNotification = (senderId, messageId = null) => ({
  senderId,
  isRead: false,
  date: new Date(),
  messageId,
});

export { createNotification };
