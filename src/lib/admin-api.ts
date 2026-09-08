"use client";

export const TOKEN_KEY = "amfex_admin_token";
export const USER_KEY = "amfex_admin_user";

export interface AdminUser {
  id: string;
  full_name: string;
  email: string;
  role: "admin" | "editor";
  is_active?: boolean;
  created_at?: string;
}

export class AuthError extends Error {}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser(): AdminUser | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AdminUser;
  } catch {
    return null;
  }
}

export function storeAuth(token: string, user: AdminUser) {
  window.localStorage.setItem(TOKEN_KEY, token);
  window.localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearAuth() {
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(USER_KEY);
}

async function apiFetch<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> | undefined),
  };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`/api${path}`, { ...options, headers });

  if (res.status === 401) {
    clearAuth();
    throw new AuthError("Session expired. Please log in again.");
  }

  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      if (body?.error) message = body.error;
    } catch {
      // ignore
    }
    throw new Error(message);
  }

  if (res.status === 204) return undefined as T;
  const json = await res.json();
  return (json.data as T) ?? (json as T);
}

export async function login(email: string, password: string): Promise<{ token: string; user: AdminUser }> {
  const res = await fetch(`/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    let message = "Login failed";
    try {
      const body = await res.json();
      if (body?.error) message = body.error;
    } catch {
      // ignore
    }
    throw new Error(message);
  }
  const json = await res.json();
  storeAuth(json.token, json.user);
  return json;
}

export async function uploadFile(file: File): Promise<string> {
  const form = new FormData();
  form.append("file", file);
  const headers: Record<string, string> = {};
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`/api/admin/upload`, { method: "POST", headers, body: form });
  if (res.status === 401) {
    clearAuth();
    throw new AuthError("Session expired. Please log in again.");
  }
  if (!res.ok) {
    let message = "Upload failed";
    try {
      const body = await res.json();
      if (body?.error) message = body.error;
    } catch {
      // ignore
    }
    throw new Error(message);
  }
  const json = await res.json();
  return json.data.url as string;
}

// ---------- Generic CRUD helpers ----------

export function listAll<T>(resource: string): Promise<T[]> {
  return apiFetch<T[]>(`/admin/${resource}`);
}

export function getOne<T>(resource: string, id: string): Promise<T> {
  return apiFetch<T>(`/admin/${resource}/${id}`);
}

export function createItem<T>(resource: string, body: Record<string, unknown>): Promise<T> {
  return apiFetch<T>(`/admin/${resource}`, { method: "POST", body: JSON.stringify(body) });
}

export function updateItem<T>(resource: string, id: string, body: Record<string, unknown>): Promise<T> {
  return apiFetch<T>(`/admin/${resource}/${id}`, { method: "PUT", body: JSON.stringify(body) });
}

export function deleteItem(resource: string, id: string): Promise<void> {
  return apiFetch<void>(`/admin/${resource}/${id}`, { method: "DELETE" });
}

// ---------- Settings + messages ----------

export type AdminSettingsMap = Record<string, string | null>;

export function getSettings(): Promise<{ key: string; value: string | null }[]> {
  return apiFetch<{ key: string; value: string | null }[]>("/admin/settings");
}

export function getSettingsMap(): Promise<AdminSettingsMap> {
  return apiFetch<AdminSettingsMap>("/settings");
}

export function saveSetting(key: string, value: unknown): Promise<{ key: string; value: string | null }[]> {
  const v = value == null ? null : typeof value === "string" ? (value as string) : JSON.stringify(value);
  return apiFetch<{ key: string; value: string | null }[]>("/admin/settings", {
    method: "PUT",
    body: JSON.stringify({ [key]: v }),
  });
}

export function saveSettings(payload: Record<string, string | null>): Promise<{ key: string; value: string | null }[]> {
  return apiFetch<{ key: string; value: string | null }[]>("/admin/settings", {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function listMessages<T>(): Promise<T[]> {
  return apiFetch<T[]>("/admin/messages");
}

export function markMessageRead(id: string): Promise<{ success: boolean }> {
  return apiFetch<{ success: boolean }>("/admin/messages", {
    method: "PUT",
    body: JSON.stringify({ id }),
  });
}

export function deleteMessage(id: string): Promise<{ success: boolean }> {
  return apiFetch<{ success: boolean }>(`/admin/messages?id=${id}`, { method: "DELETE" });
}

// ---------- Users (admin only) ----------

export function listUsers(): Promise<AdminUser[]> {
  return apiFetch<AdminUser[]>("/auth/users");
}

export function createUser(body: Record<string, unknown>): Promise<AdminUser> {
  return apiFetch<AdminUser>("/auth/users", { method: "POST", body: JSON.stringify(body) });
}

export function updateUser(id: string, body: Record<string, unknown>): Promise<AdminUser> {
  return apiFetch<AdminUser>(`/auth/users/${id}`, { method: "PUT", body: JSON.stringify(body) });
}

export function deleteUser(id: string): Promise<{ success: boolean }> {
  return apiFetch<{ success: boolean }>(`/auth/users/${id}`, { method: "DELETE" });
}

export const adminApi = {
  login,
  uploadFile,
  listAll,
  getOne,
  createItem,
  updateItem,
  deleteItem,
  getSettings,
  getSettingsMap,
  saveSetting,
  saveSettings,
  listMessages,
  markMessageRead,
  deleteMessage,
  listUsers,
  createUser,
  updateUser,
  deleteUser,
};
