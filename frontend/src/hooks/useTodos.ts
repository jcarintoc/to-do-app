import { useState, useEffect, useCallback } from "react";
import { todosApi } from "@/api";
import { useAuth } from "@/context/AuthContext";
import type { Todo } from "@/types";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { token } = useAuth();

  const fetchTodos = useCallback(async () => {
    if (!token) return;

    setIsLoading(true);
    setError(null);

    try {
      const data = await todosApi.getAll(token);
      setTodos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch todos");
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const addTodo = async (title: string) => {
    if (!token) return;

    try {
      const newTodo = await todosApi.create({ title }, token);
      setTodos((prev) => [newTodo, ...prev]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create todo");
      throw err;
    }
  };

  const updateTodo = async (id: number, data: { title?: string; completed?: boolean }) => {
    if (!token) return;

    try {
      const updatedTodo = await todosApi.update(id, data, token);
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update todo");
      throw err;
    }
  };

  const deleteTodo = async (id: number) => {
    if (!token) return;

    try {
      await todosApi.delete(id, token);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete todo");
      throw err;
    }
  };

  const toggleTodo = async (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    await updateTodo(id, { completed: !todo.completed });
  };

  return {
    todos,
    isLoading,
    error,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
    refetch: fetchTodos,
  };
}
