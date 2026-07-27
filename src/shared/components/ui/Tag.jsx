import { cn } from "@/shared/utils/cn"

/** Etiqueta de tecnología / skill. */
export default function Tag({ className, children, ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-[--color-border] bg-[--color-surface-2] px-2.5 py-1 font-mono text-xs text-[--color-muted] transition-colors duration-200 hover:border-[--color-accent] hover:text-[--color-accent]",
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
