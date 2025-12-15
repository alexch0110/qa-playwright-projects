import { Link } from "react-router-dom";
import { Input } from "../Input";
import { Button } from "../Button";
import type { Project } from "../../shared/api/projects";

type Props = {
  projects: Project[];
  loading: boolean;

  editingId: number | null;
  editingName: string;
  savingEdit: boolean;

  deletingId: number | null;

  onStartEdit: (p: Project) => void;
  onCancelEdit: () => void;
  onChangeEditName: (v: string) => void;
  onSaveEdit: () => void;
  onDelete: (p: Project) => void;
};

export function ProjectsList({
  projects,
  loading,
  editingId,
  editingName,
  savingEdit,
  deletingId,
  onStartEdit,
  onCancelEdit,
  onChangeEditName,
  onSaveEdit,
  onDelete,
}: Props) {
  if (loading) return <div className="text-sm text-slate-400">Loading...</div>;
  if (projects.length === 0)
    return <div className="text-sm text-slate-400">No projects yet</div>;

  const canSaveEdit = editingId !== null && editingName.trim().length > 0;

  return (
    <ul className="divide-y divide-slate-800">
      {projects.map((p) => {
        const isEditing = editingId === p.id;
        const isDeleting = deletingId === p.id;

        return (
          <li
            key={p.id}
            className="py-3 flex items-center justify-between gap-3"
          >
            <div className="min-w-0 flex-1">
              {isEditing ? (
                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <Input
                      label="Project name"
                      value={editingName}
                      onChange={(e) => onChangeEditName(e.target.value)}
                      data-testid={`project-edit-input-${p.id}`}
                    />
                  </div>

                  <Button
                    onClick={onSaveEdit}
                    isLoading={savingEdit}
                    disabled={!canSaveEdit}
                    data-testid={`project-edit-save-${p.id}`}
                  >
                    Save
                  </Button>

                  <Button
                    onClick={onCancelEdit}
                    disabled={savingEdit}
                    data-testid={`project-edit-cancel-${p.id}`}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <>
                  <div
                    className="font-medium truncate"
                    data-testid={`project-${p.id}`}
                    title={p.name}
                  >
                    {p.name}
                  </div>
                  <div className="text-xs text-slate-400">id: {p.id}</div>
                </>
              )}
            </div>

            {!isEditing && (
              <div className="flex items-center gap-2">
                <Link
                  to={`/projects/${p.id}`}
                  className="text-sm text-slate-200 hover:text-white underline"
                  data-testid={`project-open-${p.id}`}
                >
                  Open
                </Link>

                <button
                  className="text-sm text-slate-300 hover:text-white underline"
                  onClick={() => onStartEdit(p)}
                  data-testid={`project-edit-${p.id}`}
                >
                  Rename
                </button>

                <button
                  className="text-sm text-red-400 hover:text-red-300 underline disabled:opacity-60"
                  onClick={() => onDelete(p)}
                  disabled={isDeleting}
                  data-testid={`project-delete-${p.id}`}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
