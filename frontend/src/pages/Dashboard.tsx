import { useTodos } from "@/hooks";
import { AddTodo, TodoList, TodoStats, TodoHints } from "@/components/todo";
import { LoadingSpinner } from "@/components";

export default function Dashboard() {
  const { todos, isLoading, error, addTodo, updateTodo, deleteTodo, toggleTodo } = useTodos();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <TodoStats todos={todos} />
      </div>

      {/* Add Todo */}
      <div className="mb-6">
        <AddTodo onAdd={addTodo} />
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm">
          {error}
        </div>
      )}

      {/* Todo List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6">
        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onUpdate={updateTodo}
          onDelete={deleteTodo}
        />
      </div>

      {/* Hints */}
      <div className="mt-6">
        <TodoHints />
      </div>
    </div>
  );
}
