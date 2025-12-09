import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { authApi } from "@/api";
import type { User } from "@/types";

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const STORAGE_KEYS = {
  TOKEN: "token",
  USER: "user",
} as const;

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem(STORAGE_KEYS.TOKEN);
    const storedUser = localStorage.getItem(STORAGE_KEYS.USER);

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser) as User);
    }
    setIsLoading(false);
  }, []);

  const saveAuthData = (authToken: string, authUser: User) => {
    localStorage.setItem(STORAGE_KEYS.TOKEN, authToken);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(authUser));
    setToken(authToken);
    setUser(authUser);
  };

  const clearAuthData = () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    setToken(null);
    setUser(null);
  };

  const login = async (email: string, password: string) => {
    const response = await authApi.login({ email, password });
    saveAuthData(response.token, response.user);
  };

  const register = async (email: string, password: string, name: string) => {
    const response = await authApi.register({ email, password, name });
    saveAuthData(response.token, response.user);
  };

  const logout = () => {
    clearAuthData();
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
