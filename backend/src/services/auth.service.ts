import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userRepository } from "../repositories/index.js";
import type { CreateUserDto, LoginDto, UserResponse, AuthPayload } from "../types/index.js";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const JWT_EXPIRES_IN = "7d";

export class AuthService {
  async register(data: CreateUserDto): Promise<{ token: string; user: UserResponse }> {
    if (userRepository.emailExists(data.email)) {
      throw new Error("Email already registered");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const userId = userRepository.create({
      ...data,
      password: hashedPassword,
    });

    const token = this.generateToken(userId);
    const user: UserResponse = {
      id: userId,
      email: data.email,
      name: data.name,
    };

    return { token, user };
  }

  async login(data: LoginDto): Promise<{ token: string; user: UserResponse }> {
    const user = userRepository.findByEmail(data.email);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isValidPassword = await bcrypt.compare(data.password, user.password);

    if (!isValidPassword) {
      throw new Error("Invalid credentials");
    }

    const token = this.generateToken(user.id);
    const userResponse: UserResponse = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    return { token, user: userResponse };
  }

  verifyToken(token: string): AuthPayload {
    return jwt.verify(token, JWT_SECRET) as AuthPayload;
  }

  private generateToken(userId: number): string {
    return jwt.sign({ userId } as AuthPayload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
  }
}

export const authService = new AuthService();
