import { useState } from "react";
import { Plus } from "lucide-react";

interface AddTodoProps {
  onAdd: (title: string) => Promise<void>;
}

export function AddTodo({ onAdd }: AddTodoProps) {
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    setIsLoading(true);

    try {
      await onAdd(trimmedTitle);
      setTitle("");
    } catch {
      // Error handled in hook
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={isLoading}
        className="w-full h-14 pl-5 pr-14 text-base bg-gray-50 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:bg-white placeholder:text-gray-400 transition-all"
      />
      <button
        type="submit"
        disabled={isLoading || !title.trim()}
        className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <Plus className="w-5 h-5" />
      </button>
    </form>
  );
}
