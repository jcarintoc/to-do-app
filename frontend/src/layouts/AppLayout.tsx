import { Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Navbar } from "@/components/Navbar";

export function AppLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Navbar user={user} onLogout={logout} />

        <main className="mt-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
