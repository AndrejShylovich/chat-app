const createUser = (userId, socketId) => ({
  userId,
  socketId,
  joinedAt: new Date(),
});

const usersToArray = (users) => [...users.keys()];

export { createUser, usersToArray };
