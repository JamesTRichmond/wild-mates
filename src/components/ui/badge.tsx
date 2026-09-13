import { cn } from "@/lib/utils";

export function Badge({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-accent shadow-[0_0_0_1px_var(--color-border)]",
        className,
      )}
      {...props}
    />
  );
}
