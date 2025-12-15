import { api } from "./client";

export type Project = {
  id: number;
  name: string;
};

export async function getProject(id: number): Promise<Project> {
  const res = await api.get(`/projects/${id}`);
  return res.data;
}

export async function getProjects(): Promise<Project[]> {
  const res = await api.get<Project[]>("/projects");
  return res.data;
}

export async function createProject(name: string): Promise<Project> {
  const res = await api.post<Project>("/projects", { name });
  return res.data;
}

export async function renameProject(
  id: number,
  name: string
): Promise<Project> {
  const res = await api.put<Project>(`/projects/${id}`, { name });
  return res.data;
}

export async function deleteProject(id: number): Promise<void> {
  await api.delete(`/projects/${id}`);
}
