import { useState } from "react";
import { Trash2, Check, X, Circle, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DeleteConfirmDialog } from "./DeleteConfirmDialog";
import type { Todo } from "@/types";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => Promise<void>;
  onUpdate: (id: number, data: { title?: string; completed?: boolean }) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export function TodoItem({ todo, onToggle, onUpdate, onDelete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const isCompleted = Boolean(todo.completed);

  const handleToggle = async () => {
    setIsLoading(true);
    try {
      await onToggle(todo.id);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await onDelete(todo.id);
      setShowDeleteDialog(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveEdit = async () => {
    const trimmedTitle = editTitle.trim();
    if (!trimmedTitle || trimmedTitle === todo.title) {
      handleCancelEdit();
      return;
    }

    setIsLoading(true);
    try {
      await onUpdate(todo.id, { title: trimmedTitle });
      setIsEditing(false);
    } catch {
      setEditTitle(todo.title);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditTitle(todo.title);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSaveEdit();
    } else if (e.key === "Escape") {
      handleCancelEdit();
    }
  };

  const handleDoubleClick = () => {
    if (!isCompleted) {
      setIsEditing(true);
    }
  };

  return (
    <>
      <div
        className={`group flex items-center gap-4 py-4 border-b border-gray-100 last:border-0 transition-opacity ${
          isLoading ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        {/* Toggle Button */}
        <button
          onClick={handleToggle}
          disabled={isLoading}
          className="shrink-0 transition-colors"
        >
          {isCompleted ? (
            <CheckCircle2 className="w-6 h-6 text-blue-500" />
          ) : (
            <Circle className="w-6 h-6 text-gray-300 hover:text-gray-400" />
          )}
        </button>

        {/* Content */}
        {isEditing ? (
          <div className="flex-1 flex items-center gap-2">
            <Input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleSaveEdit}
              className="flex-1 h-9 text-base"
              autoFocus
            />
            <button
              onClick={handleSaveEdit}
              className="p-2 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
            >
              <Check className="w-4 h-4" />
            </button>
            <button
              onClick={handleCancelEdit}
              className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
            <span
              onDoubleClick={handleDoubleClick}
              className={`flex-1 text-base select-none cursor-default ${
                isCompleted
                  ? "line-through text-gray-400"
                  : "text-gray-700"
              }`}
            >
              {todo.title}
            </span>

            {/* Delete Button */}
            <button
              onClick={() => setShowDeleteDialog(true)}
              disabled={isLoading}
              className="shrink-0 p-2 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      <DeleteConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDelete}
        isLoading={isLoading}
        taskTitle={todo.title}
      />
    </>
  );
}
