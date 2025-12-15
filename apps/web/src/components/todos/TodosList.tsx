import { Button } from "../Button";
import { Input } from "../Input";
import type { Todo } from "../../shared/api/todos";

type Props = {
  todos: Todo[];

  togglingId: number | null;
  onToggle: (todo: Todo) => void;

  editingId: number | null;
  editingTitle: string;
  savingEdit: boolean;
  onStartEdit: (todo: Todo) => void;
  onCancelEdit: () => void;
  onChangeEditTitle: (v: string) => void;
  onSaveEdit: () => void;

  deletingId: number | null;
  onDelete: (todo: Todo) => void;
};

export function TodosList({
  todos,
  togglingId,
  onToggle,

  editingId,
  editingTitle,
  savingEdit,
  onStartEdit,
  onCancelEdit,
  onChangeEditTitle,
  onSaveEdit,

  deletingId,
  onDelete,
}: Props) {
  if (todos.length === 0) {
    return <div className="text-sm text-slate-400">No todos yet</div>;
  }

  const canSaveEdit = editingId !== null && editingTitle.trim().length > 0;

  return (
    <ul className="divide-y divide-slate-800">
      {todos.map((todo) => {
        const isEditing = editingId === todo.id;
        const isDeleting = deletingId === todo.id;
        const isToggling = togglingId === todo.id;

        return (
          <li
            key={todo.id}
            className="py-3 flex items-center justify-between gap-3"
            data-testid={`todo-${todo.id}`}
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo)}
                disabled={isToggling}
                className="h-4 w-4"
                data-testid={`todo-toggle-${todo.id}`}
              />

              <div className="min-w-0 flex-1">
                {isEditing ? (
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <Input
                        label="Todo title"
                        value={editingTitle}
                        onChange={(e) => onChangeEditTitle(e.target.value)}
                        data-testid={`todo-edit-input-${todo.id}`}
                      />
                    </div>

                    <Button
                      onClick={onSaveEdit}
                      isLoading={savingEdit}
                      disabled={!canSaveEdit}
                      data-testid={`todo-edit-save-${todo.id}`}
                    >
                      Save
                    </Button>

                    <Button
                      onClick={onCancelEdit}
                      disabled={savingEdit}
                      data-testid={`todo-edit-cancel-${todo.id}`}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <>
                    <div
                      className={
                        todo.completed
                          ? "font-medium line-through opacity-60 truncate"
                          : "font-medium truncate"
                      }
                      title={todo.title}
                    >
                      {todo.title}
                    </div>

                    <div className="text-xs text-slate-400">
                      Status:{" "}
                      <span
                        className={
                          todo.completed ? "text-green-400" : "text-slate-300"
                        }
                        data-testid={`todo-status-${todo.id}`}
                      >
                        {todo.completed ? "Completed" : "Active"}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {!isEditing && (
              <div className="flex items-center gap-2">
                <button
                  className="text-sm text-slate-300 hover:text-white underline"
                  onClick={() => onStartEdit(todo)}
                  data-testid={`todo-edit-${todo.id}`}
                >
                  Rename
                </button>

                <button
                  className="text-sm text-red-400 hover:text-red-300 underline disabled:opacity-60"
                  onClick={() => onDelete(todo)}
                  disabled={isDeleting}
                  data-testid={`todo-delete-${todo.id}`}
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
