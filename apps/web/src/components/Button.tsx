import { clsx } from "clsx";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean;
};

export function Button({
  className,
  isLoading,
  disabled,
  children,
  ...rest
}: Props) {
  return (
    <button
      {...rest}
      disabled={disabled || isLoading}
      className={clsx(
        "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium",
        "bg-slate-100 text-slate-900 hover:bg-white transition",
        "disabled:opacity-60 disabled:cursor-not-allowed",
        className
      )}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}
