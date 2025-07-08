const createServerConfig = (
  corsOrigin = "http://localhost:5173",
  methods = ["GET", "POST"]
) => ({
  cors: { origin: corsOrigin, methods },
});

export { createServerConfig };
