import { Check, LogOut } from "lucide-react";
import type { User } from "@/types";

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
}

export function Navbar({ user, onLogout }: NavbarProps) {
  return (
    <nav className="bg-gray-900 rounded-full p-2 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <Check className="w-4 h-4 text-gray-900" />
        </div>
        <span className="text-white font-medium">TODOLIST</span>
      </div>

      {/* Nav Links */}
      {/* <div className="hidden sm:flex items-center gap-8">
        <span className="text-white text-sm font-medium">Tasks</span>
      </div> */}

      {/* User Info */}
      <div className="flex items-center gap-2">
        <button
          onClick={onLogout}
          className="bg-white text-gray-900 text-sm font-medium px-4 py-2 rounded-full hover:bg-gray-100 transition-colors flex items-center gap-2"
        >
          <span>{user?.email}</span>
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </nav>
  );
}
