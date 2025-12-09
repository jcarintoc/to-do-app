import { Router } from "express";
import { todoController } from "../controllers/index.js";
import { authMiddleware, type AuthRequest } from "../middleware/auth.middleware.js";

const router = Router();

// All todo routes require authentication
router.use(authMiddleware);

router.get("/", (req, res) => todoController.getAll(req as AuthRequest, res));
router.post("/", (req, res) => todoController.create(req as AuthRequest, res));
router.put("/:id", (req, res) => todoController.update(req as AuthRequest, res));
router.delete("/:id", (req, res) => todoController.delete(req as AuthRequest, res));

export default router;
