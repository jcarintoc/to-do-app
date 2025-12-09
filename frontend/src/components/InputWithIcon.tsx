import { forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { LucideIcon } from "lucide-react";

interface InputWithIconProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: LucideIcon;
  label: string;
}

export const InputWithIcon = forwardRef<HTMLInputElement, InputWithIconProps>(
  ({ icon: Icon, label, className = "", ...props }, ref) => {
    return (
      <div className="space-y-2">
        <Label htmlFor={props.id} className="sr-only">
          {label}
        </Label>
        <div className="relative">
          <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            ref={ref}
            className={`pl-10 h-12 bg-gray-50 border-gray-200 rounded-lg focus:bg-white ${className}`}
            {...props}
          />
        </div>
      </div>
    );
  }
);

InputWithIcon.displayName = "InputWithIcon";
