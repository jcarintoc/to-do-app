import { Check } from "lucide-react";

interface LogoProps {
  className?: string;
}

export function Logo({ className = "" }: LogoProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center">
        <Check className="w-5 h-5 text-white" />
      </div>
      <span className="text-xl font-semibold text-gray-800">TodoList</span>
    </div>
  );
}
