import { Badge } from "@/components/ui/badge";
import type { Todo } from "@/types";
import { Check, CircleDashed } from "lucide-react";

interface TodoStatsProps {
  todos: Todo[];
}

export function TodoStats({ todos }: TodoStatsProps) {
  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const pending = total - completed;

  if (total === 0) return null;

  return (
    <div className="flex items-center gap-2">
      <Badge variant="secondary" className="bg-teal-100 text-teal-700 border-0">
        <Check className="mr-1" />
        {completed} done
      </Badge>
      {pending > 0 && (
        <Badge
          variant="secondary"
          className="bg-amber-100 text-amber-700 border-0"
        >
          <CircleDashed className="mr-1" />
          {pending} pending
        </Badge>
      )}
    </div>
  );
}
