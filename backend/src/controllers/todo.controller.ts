import type { Response } from "express";
import type { AuthRequest } from "../middleware/auth.middleware.js";
import { todoService } from "../services/index.js";

export class TodoController {
  getAll(req: AuthRequest, res: Response): void {
    try {
      const todos = todoService.getAllByUserId(req.userId!);
      res.json(todos);
    } catch (error) {
      console.error("Get todos error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  create(req: AuthRequest, res: Response): void {
    try {
      const { title } = req.body;

      if (!title) {
        res.status(400).json({ error: "Title is required" });
        return;
      }

      const todo = todoService.create(req.userId!, { title });
      res.status(201).json(todo);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to create todo";
      console.error("Create todo error:", error);
      res.status(500).json({ error: message });
    }
  }

  update(req: AuthRequest, res: Response): void {
    try {
      const { id } = req.params;
      const { title, completed } = req.body;

      const todo = todoService.update(Number(id), req.userId!, { title, completed });
      res.json(todo);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to update todo";

      if (message === "Todo not found") {
        res.status(404).json({ error: message });
        return;
      }

      console.error("Update todo error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  delete(req: AuthRequest, res: Response): void {
    try {
      const { id } = req.params;

      todoService.delete(Number(id), req.userId!);
      res.json({ message: "Todo deleted successfully" });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to delete todo";

      if (message === "Todo not found") {
        res.status(404).json({ error: message });
        return;
      }

      console.error("Delete todo error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export const todoController = new TodoController();
