import { useEffect, useMemo, useState } from "react";

import { Layout } from "../components/Layout";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { Input } from "../components/Input";

import { getApiErrorMessage } from "../shared/api/error";
import {
  type Project,
  getProjects,
  createProject as apiCreateProject,
  renameProject as apiRenameProject,
  deleteProject as apiDeleteProject,
} from "../shared/api/projects";

import { ProjectsList } from "../components/projects/ProjectsList";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  const [name, setName] = useState("");
  const canCreate = useMemo(() => name.trim().length > 0, [name]);
  const [creating, setCreating] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");
  const [savingEdit, setSavingEdit] = useState(false);

  const [deletingId, setDeletingId] = useState<number | null>(null);

  async function load() {
    setError(null);
    setLoading(true);

    try {
      const data = await getProjects();
      setProjects(data);
    } catch (e: unknown) {
      setError(getApiErrorMessage(e, "Failed to load projects"));
    } finally {
      setLoading(false);
    }
  }

  async function create() {
    if (!canCreate) return;

    setCreating(true);
    setError(null);

    try {
      const created = await apiCreateProject(name.trim());
      setProjects((prev) => [created, ...prev]);
      setName("");
    } catch (e: unknown) {
      setError(getApiErrorMessage(e, "Failed to create project"));
    } finally {
      setCreating(false);
    }
  }

  function startEdit(p: Project) {
    setError(null);
    setEditingId(p.id);
    setEditingName(p.name);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditingName("");
  }

  async function saveEdit() {
    if (editingId === null) return;
    const newName = editingName.trim();
    if (!newName) return;

    setSavingEdit(true);
    setError(null);

    try {
      const updated = await apiRenameProject(editingId, newName);
      setProjects((prev) =>
        prev.map((p) => (p.id === editingId ? updated : p))
      );
      cancelEdit();
    } catch (e: unknown) {
      setError(getApiErrorMessage(e, "Failed to rename project"));
    } finally {
      setSavingEdit(false);
    }
  }

  async function remove(p: Project) {
    const ok = window.confirm(
      `Delete project "${p.name}"? This can't be undone.`
    );
    if (!ok) return;

    setDeletingId(p.id);
    setError(null);

    try {
      await apiDeleteProject(p.id);
      setProjects((prev) => prev.filter((x) => x.id !== p.id));

      if (editingId === p.id) cancelEdit();
    } catch (e: unknown) {
      setError(getApiErrorMessage(e, "Failed to delete project"));
    } finally {
      setDeletingId(null);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <Layout title="Projects">
      <div className="grid gap-6">
        <Card>
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <Input
                label="New project name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. QA Learning"
                data-testid="project-name"
              />
            </div>

            <Button
              onClick={create}
              isLoading={creating}
              disabled={!canCreate}
              data-testid="project-create"
            >
              Create
            </Button>
          </div>

          {error && <div className="mt-3 text-sm text-red-400">{error}</div>}
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold">Your projects</div>
            <Button onClick={load} disabled={loading}>
              Refresh
            </Button>
          </div>

          <div className="mt-4">
            <ProjectsList
              projects={projects}
              loading={loading}
              editingId={editingId}
              editingName={editingName}
              savingEdit={savingEdit}
              deletingId={deletingId}
              onStartEdit={startEdit}
              onCancelEdit={cancelEdit}
              onChangeEditName={setEditingName}
              onSaveEdit={saveEdit}
              onDelete={remove}
            />
          </div>
        </Card>
      </div>
    </Layout>
  );
}
