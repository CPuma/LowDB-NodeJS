import express from "express";
import morgan from "morgan";
import taskRoutes from "./routes/task.routes";
import { handlingError } from "./errors/errorHandler";

// INITIALIZATION
const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true, inflate: false }));

// Routes
app.use("/api/tasks", taskRoutes);

// errorHandler
app.use(handlingError);

// exports
export default app;
