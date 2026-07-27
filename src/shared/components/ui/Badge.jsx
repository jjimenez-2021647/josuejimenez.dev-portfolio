import { cn } from "@/shared/utils/cn"

/** Badge pequeña de estado / etiqueta destacada. */
export default function Badge({ className, children, ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-[--color-border] bg-[--color-surface-2] px-3 py-1 font-mono text-xs text-[--color-accent-soft]",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
