import { motion } from "framer-motion"
import { cn } from "@/shared/utils/cn"

const variants = {
  primary:
    "bg-[--color-primary] text-white hover:bg-[--color-primary-strong] shadow-lg",
  outline:
    "border border-[--color-border] text-[--color-foreground] hover:border-[--color-accent] hover:text-[--color-accent] bg-transparent",
  ghost: "text-[--color-muted] hover:text-[--color-foreground] bg-transparent",
  accent: "bg-[--color-accent] text-[--color-background] hover:bg-[--color-accent-soft]",
}

/**
 * Botón animado. Renderiza <a> si recibe href, si no <button>.
 * Añade animación de aparición por defecto (fade + slide). Pasar `disableReveal` para desactivarla.
 */
export default function Button({
  as,
  href,
  variant = "primary",
  className,
  children,
  disableReveal = false,
  revealDelay = 0,
  ...props
}) {
  const Comp = motion[as ?? (href ? "a" : "button")]

  const revealProps = disableReveal
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.55, delay: revealDelay, ease: [0.22, 1, 0.36, 1] },
      }

  return (
    <Comp
      href={href}
      whileHover={{ y: -3, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 380, damping: 24 }}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium font-mono tracking-tight transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-accent] focus-visible:ring-offset-2 focus-visible:ring-offset-[--color-background]",
        variants[variant],
        className,
      )}
      {...revealProps}
      {...props}
    >
      {children}
    </Comp>
  )
}
