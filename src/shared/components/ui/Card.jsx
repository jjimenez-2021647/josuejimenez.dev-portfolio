import { cn } from "@/shared/utils/cn"

/** Tarjeta base con superficie oscura y borde sutil. */
export default function Card({ className, glow = false, children, ...props }) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-[--color-border] bg-[--color-surface]/90 backdrop-blur-xl p-6 shadow-2xl shadow-[rgba(0,0,0,0.18)] transition-colors duration-300",
        glow && "glow-border",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
