const IS_MOCK = process.env.NEXT_PUBLIC_API_MOCK === "true";

export const BASE_URL = IS_MOCK
  ? (process.env.NEXT_PUBLIC_MOCK_URL ?? "http://localhost:3333")
  : (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080");

type FetchOptions = {
  method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: unknown;
  token?: string;
  tags?: string[];
  revalidate?: number;
};

export async function apiFetch<T>(
  path: string,
  options: FetchOptions = {}
): Promise<T> {
  const { method = "GET", body, token, tags, revalidate } = options;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    next: {
      ...(tags ? { tags } : {}),
      ...(revalidate !== undefined ? { revalidate } : {}),
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`[${method} ${path}] ${res.status}: ${text}`);
  }

  if (res.status === 204) return undefined as T;

  const json = await res.json();
  // json-server returns data directly; real API wraps in { status_code, data }
  return (IS_MOCK ? json : json?.data !== undefined ? json.data : json) as T;
}
