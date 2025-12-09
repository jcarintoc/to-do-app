import { apiClient } from "./client";
import type { AuthResponse, LoginRequest, RegisterRequest } from "@/types";

export const authApi = {
  login: (data: LoginRequest): Promise<AuthResponse> => {
    return apiClient<AuthResponse>("/auth/login", {
      method: "POST",
      body: data,
    });
  },

  register: (data: RegisterRequest): Promise<AuthResponse> => {
    return apiClient<AuthResponse>("/auth/register", {
      method: "POST",
      body: data,
    });
  },
};
