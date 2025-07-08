import { usersToArray } from "../utils/helpers.js";

const createUsersState = (initialUsers = new Map()) => {
  let users = initialUsers;

  return {
    get: () => users,
    set: (newUsers) => {
      users = newUsers;
    },
    size: () => users.size,
    toArray: () => usersToArray(users),
  };
};

export { createUsersState };
