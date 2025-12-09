import { MousePointerClick, Trash2, Circle } from "lucide-react";

export function TodoHints() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-gray-400">
      <div className="flex items-center gap-1.5">
        <MousePointerClick className="w-3.5 h-3.5" />
        <span>Double-click to edit</span>
      </div>
      <div className="flex items-center gap-1.5">
        <Circle className="w-3.5 h-3.5" />
        <span>Click circle to complete</span>
      </div>
      <div className="flex items-center gap-1.5">
        <Trash2 className="w-3.5 h-3.5" />
        <span>Hover to delete</span>
      </div>
    </div>
  );
}
