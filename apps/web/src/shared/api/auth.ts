import { api } from "./client";

// Тип ответа register: у тебя backend возвращает { id, email }
export type RegisterResponse = { id: number; email: string };

// Тип ответа login: { token }
export type LoginResponse = { token: string };

export async function register(email: string, password: string) {
  const res = await api.post<RegisterResponse>("/auth/register", {
    email,
    password,
  });
  return res.data;
}

export async function login(email: string, password: string) {
  const res = await api.post<LoginResponse>("/auth/login", { email, password });
  return res.data;
}
