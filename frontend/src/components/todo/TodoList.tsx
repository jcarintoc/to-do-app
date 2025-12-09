import { TodoItem } from "./TodoItem";
import { ClipboardList } from "lucide-react";
import type { Todo } from "@/types";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => Promise<void>;
  onUpdate: (id: number, data: { title?: string; completed?: boolean }) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export function TodoList({ todos, onToggle, onUpdate, onDelete }: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-400">
        <ClipboardList className="w-12 h-12 mb-4 stroke-1" />
        <p className="text-base">No tasks yet</p>
        <p className="text-sm mt-1">Add one above to get started</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-100">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
