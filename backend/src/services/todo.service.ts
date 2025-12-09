import { todoRepository } from "../repositories/index.js";
import type { Todo, CreateTodoDto, UpdateTodoDto } from "../types/index.js";

export class TodoService {
  getAllByUserId(userId: number): Todo[] {
    return todoRepository.findAllByUserId(userId);
  }

  create(userId: number, data: CreateTodoDto): Todo {
    if (!data.title?.trim()) {
      throw new Error("Title is required");
    }

    return todoRepository.create(userId, data.title.trim());
  }

  update(id: number, userId: number, data: UpdateTodoDto): Todo {
    const existingTodo = todoRepository.findByIdAndUserId(id, userId);

    if (!existingTodo) {
      throw new Error("Todo not found");
    }

    const updateData: { title?: string; completed?: number } = {};

    if (data.title !== undefined) {
      updateData.title = data.title;
    }

    if (data.completed !== undefined) {
      updateData.completed = data.completed ? 1 : 0;
    }

    const updatedTodo = todoRepository.update(id, userId, updateData);

    if (!updatedTodo) {
      throw new Error("Failed to update todo");
    }

    return updatedTodo;
  }

  delete(id: number, userId: number): void {
    const existingTodo = todoRepository.findByIdAndUserId(id, userId);

    if (!existingTodo) {
      throw new Error("Todo not found");
    }

    const deleted = todoRepository.delete(id, userId);

    if (!deleted) {
      throw new Error("Failed to delete todo");
    }
  }
}

export const todoService = new TodoService();
