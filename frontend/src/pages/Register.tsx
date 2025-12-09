import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { ApiError } from "@/api";
import { Button } from "@/components/ui/button";
import { AuthLayout, InputWithIcon, FormError } from "@/components";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const validateForm = (): string | null => {
    if (password !== confirmPassword) {
      return "Passwords do not match";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);

    try {
      await register(email, password, name);
      navigate("/");
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Register"
      illustrationTitle="Join TaskFlow"
      illustrationDescription="Create an account and start organizing your tasks"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <FormError message={error} />

        <InputWithIcon
          id="name"
          type="text"
          placeholder="Full Name"
          icon={User}
          label="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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

        <InputWithIcon
          id="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          icon={Lock}
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <Button
          type="submit"
          className="w-full h-12 bg-gray-900 hover:bg-gray-800 text-white rounded-lg font-medium"
          disabled={isLoading}
        >
          {isLoading ? "Creating account..." : "Register"}
        </Button>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-teal-600 font-medium hover:underline">
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
