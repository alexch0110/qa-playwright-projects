import { Button } from "../Button";
import { Input } from "../Input";

type Props = {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  isLoading?: boolean;
  error?: string | null;
};

export function TodoCreateForm({
  value,
  onChange,
  onSubmit,
  isLoading = false,
  error = null,
}: Props) {
  const canSubmit = value.trim().length > 0;

  return (
    <div>
      <div className="flex items-end gap-3">
        <div className="flex-1">
          <Input
            label="New todo"
            placeholder="e.g. Implement CI"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            data-testid="todo-new-title"
          />
        </div>

        <Button
          onClick={onSubmit}
          isLoading={isLoading}
          disabled={!canSubmit}
          data-testid="todo-create"
        >
          Add
        </Button>
      </div>

      {error && <div className="mt-3 text-sm text-red-400">{error}</div>}
    </div>
  );
}
