import { clsx } from "clsx";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export function Input({ label, error, className, ...rest }: Props) {
  return (
    <div className="space-y-1">
      {label && <div className="text-sm text-slate-300">{label}</div>}
      <input
        {...rest}
        className={clsx(
          "w-full rounded-xl bg-slate-900 border border-slate-800 px-3 py-2 text-sm",
          "focus:outline-none focus:ring-2 focus:ring-slate-500",
          error && "border-red-500",
          className
        )}
      />
      {error && <div className="text-xs text-red-400">{error}</div>}
    </div>
  );
}
