import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { ApiError } from "@/api";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AuthLayout, InputWithIcon, FormError } from "@/components";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Login"
      illustrationTitle="Organize your tasks"
      illustrationDescription="Stay productive and manage your day efficiently"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <FormError message={error} />

        <InputWithIcon
          id="email"
          type="email"
          placeholder="Email"
          icon={Mail}
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <InputWithIcon
          id="password"
          type="password"
          placeholder="Password"
          icon={Lock}
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            />
            <Label htmlFor="remember" className="text-sm text-gray-500 cursor-pointer">
              Remember Password
            </Label>
          </div>
          <Link to="/forgot-password" className="text-sm text-teal-600 hover:underline">
            Forget Password?
          </Link>
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>

        <p className="text-center text-sm text-gray-500">
          No account yet?{" "}
          <Link to="/register" className="text-teal-600 font-medium hover:underline">
            Register
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
