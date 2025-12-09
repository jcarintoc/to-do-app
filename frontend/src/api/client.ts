// In production (Docker), use relative URL so nginx can proxy
// In development, use localhost
const API_URL = import.meta.env.PROD
  ? "/api"
  : (import.meta.env.VITE_API_URL || "http://localhost:3001/api");

interface RequestConfig {
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  token?: string | null;
}

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiClient<T>(
  endpoint: string,
  config: RequestConfig
): Promise<T> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (config.token) {
    headers["Authorization"] = `Bearer ${config.token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    method: config.method,
    headers,
    body: config.body ? JSON.stringify(config.body) : undefined,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new ApiError(response.status, data.error || "Something went wrong");
  }

  return data as T;
}
