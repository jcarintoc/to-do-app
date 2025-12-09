export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  created_at: string;
}

export interface UserResponse {
  id: number;
  email: string;
  name: string;
}

export interface Todo {
  id: number;
  user_id: number;
  title: string;
  completed: number;
  created_at: string;
}

export interface CreateUserDto {
  email: string;
  password: string;
  name: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface CreateTodoDto {
  title: string;
}

export interface UpdateTodoDto {
  title?: string;
  completed?: boolean;
}

export interface AuthPayload {
  userId: number;
}
