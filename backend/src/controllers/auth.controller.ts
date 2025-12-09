import type { Request, Response } from "express";
import { authService } from "../services/index.js";

export class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, name } = req.body;

      if (!email || !password || !name) {
        res.status(400).json({ error: "Email, password, and name are required" });
        return;
      }

      const result = await authService.register({ email, password, name });

      res.status(201).json({
        message: "User created successfully",
        ...result,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Registration failed";

      if (message === "Email already registered") {
        res.status(400).json({ error: message });
        return;
      }

      console.error("Register error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ error: "Email and password are required" });
        return;
      }

      const result = await authService.login({ email, password });

      res.json({
        message: "Login successful",
        ...result,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Login failed";

      if (message === "Invalid credentials") {
        res.status(401).json({ error: message });
        return;
      }

      console.error("Login error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export const authController = new AuthController();
