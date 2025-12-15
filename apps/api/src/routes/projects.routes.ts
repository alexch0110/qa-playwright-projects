import { Router } from "express";
import { auth } from "../middleware/auth";
import { checkOwnership } from "../middleware/project-ownership";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getProjectById,
} from "../controllers/projects.controller";
import todoRoutes from "./todos.routes";
import { asyncHandler } from "../utils/async-handler";
import { validate } from "../middleware/validate";
import {
  projectCreateSchema,
  projectUpdateSchema,
} from "../schemas/projects.schema";

const router = Router();

router.use(auth);

router.get("/", asyncHandler(getProjects));
router.post("/", validate(projectCreateSchema), asyncHandler(createProject));

router.use("/:id", asyncHandler(checkOwnership));
router.get("/:id", asyncHandler(getProjectById));
router.put("/:id", validate(projectUpdateSchema), asyncHandler(updateProject));
router.delete("/:id", asyncHandler(deleteProject));

router.use("/:projectId/todos", asyncHandler(checkOwnership), todoRoutes);

export default router;
