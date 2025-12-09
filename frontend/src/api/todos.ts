import { apiClient } from "./client";
import type { Todo, CreateTodoRequest, UpdateTodoRequest } from "@/types";

export const todosApi = {
  getAll: (token: string): Promise<Todo[]> => {
    return apiClient<Todo[]>("/todos", {
      method: "GET",
      token,
    });
  },

  create: (data: CreateTodoRequest, token: string): Promise<Todo> => {
    return apiClient<Todo>("/todos", {
      method: "POST",
      body: data,
      token,
    });
  },

  update: (id: number, data: UpdateTodoRequest, token: string): Promise<Todo> => {
    return apiClient<Todo>(`/todos/${id}`, {
      method: "PUT",
      body: data,
      token,
    });
  },

  delete: (id: number, token: string): Promise<{ message: string }> => {
    return apiClient<{ message: string }>(`/todos/${id}`, {
      method: "DELETE",
      token,
    });
  },
};
