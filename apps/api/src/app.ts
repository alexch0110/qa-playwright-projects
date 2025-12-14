import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import projectsRoutes from "./routes/projects.routes";
import { errorHandler } from "./middleware/error-handler";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/auth", authRoutes);
app.use("/projects", projectsRoutes);

app.use(errorHandler);

export default app;
