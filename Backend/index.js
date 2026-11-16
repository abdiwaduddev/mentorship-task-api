import express from "express";
import mongoose from "mongoose";
import studentRoutes from "./routes/student.js";
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import uploadRoutes from "./routes/upload.js";
import taskRoutes from "./routes/task.js";

import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./utils/swagger.js";
import { limiter } from "./middlewares/rateLimiter.js";

import { logger } from "./middlewares/logger.js";
import { notFound } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

// 🔒 In production:
app.use(
  cors({
    origin: ["https://mentorship-task-api.onrender.com/"],
  }),
);

// helmet

app.use(helmet());

// morgan
if (process.env.NODE_ENV === "Development") {
  app.use(morgan("dev"));
}

app.use(limiter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`You are listening on port ${PORT}`);
});

// logger middleware

app.use(logger);

//Routes
// memory
// app.use("/api/users", userRoutes);
// database
app.use("/api/student", studentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ✅ 3. 404 Handler – Only runs if no route matched
app.use(notFound);

// ✅ 4. Global Error Handler – Catches all thrown errors
app.use(errorHandler);

mongoose
  .connect(
    process.env.NODE_ENV == "development"
      ? process.env.MONGO_URI_DEV
      : process.env.MONGO_URI_PRO,
  )
  .then(() => console.log("✅ MongoDB connected locally"))
  .catch((err) => console.error("❌ Connection error:", err));
