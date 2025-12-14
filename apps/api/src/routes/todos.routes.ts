import { Router } from "express";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todos.controller";
import { asyncHandler } from "../utils/async-handler";
import { validate } from "../middleware/validate";
import {
  todoCreateSchema,
  todoUpdateSchema,
  todoDeleteSchema,
} from "../schemas/todos.schema";

const router = Router({ mergeParams: true });

router.get("/", asyncHandler(getTodos));
router.post("/", validate(todoCreateSchema), asyncHandler(createTodo));
router.put("/:id", validate(todoUpdateSchema), asyncHandler(updateTodo));
router.delete("/:id", validate(todoDeleteSchema), asyncHandler(deleteTodo));

export default router;
