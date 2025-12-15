import { api } from "./client";

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  projectId: number;
};

export async function getTodos(projectId: number): Promise<Todo[]> {
  const res = await api.get<Todo[]>(`/projects/${projectId}/todos`);
  return res.data;
}

export async function createTodo(
  projectId: number,
  title: string
): Promise<Todo> {
  const res = await api.post<Todo>(`/projects/${projectId}/todos`, { title });
  return res.data;
}

export async function toggleTodo(
  projectId: number,
  todoId: number,
  completed: boolean
): Promise<Todo> {
  const res = await api.put<Todo>(`/projects/${projectId}/todos/${todoId}`, {
    completed,
  });
  return res.data;
}

export async function updateTodo(
  projectId: number,
  todoId: number,
  data: { title?: string; completed?: boolean }
): Promise<Todo> {
  const res = await api.put<Todo>(
    `/projects/${projectId}/todos/${todoId}`,
    data
  );
  return res.data;
}

export async function deleteTodo(
  projectId: number,
  todoId: number
): Promise<void> {
  await api.delete(`/projects/${projectId}/todos/${todoId}`);
}
