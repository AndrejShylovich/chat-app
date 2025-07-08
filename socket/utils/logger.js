const log = (prefix, message) => console.log(`[${prefix}] ${message}`);
const socketLog = (message) => log("Socket", message);

export { log, socketLog };
