import { clsx } from "clsx";

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        "rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow",
        className
      )}
    >
      {children}
    </div>
  );
}
