export interface Todo {
  id: number;
  user_id: number;
  title: string;
  completed: number;
  created_at: string;
}

export interface CreateTodoRequest {
  title: string;
}

export interface UpdateTodoRequest {
  title?: string;
  completed?: boolean;
}
