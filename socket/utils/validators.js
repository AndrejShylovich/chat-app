const isValidUserId = (userId) =>
  userId && typeof userId === "string" && userId.trim().length > 0;

const isValidMessage = (message) =>
  message &&
  message.senderId &&
  message.recipientId &&
  message.senderId !== message.recipientId;

export { isValidUserId, isValidMessage };
