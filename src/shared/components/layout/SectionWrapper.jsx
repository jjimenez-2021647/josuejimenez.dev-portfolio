import { motion } from "framer-motion"
import { cn } from "@/shared/utils/cn"
import { fadeUp, revealViewport } from "@/shared/hooks/useScrollReveal"

/**
 * Envoltura estándar de sección: id para el scroll-spy, padding consistente,
 * encabezado con número + título, y animación de entrada.
 */
export default function SectionWrapper({
  id,
  index,
  eyebrow,
  title,
  children,
  className,
  contentClassName,
}) {
  return (
    <section
      id={id}
      className={cn("relative scroll-mt-24 px-6 py-24 md:px-10 lg:py-32", className)}
    >
      <div className="mx-auto max-w-6xl">
        {(eyebrow || title) && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="mb-14"
          >
            {eyebrow && (
              <div className="mb-3 flex items-center gap-3 font-mono text-xs text-[--color-accent]">
                {index != null && (
                  <span className="text-[--color-muted-2]">
                    {String(index).padStart(2, "0")}
                  </span>
                )}
                <span className="h-px w-8 bg-[--color-accent]" />
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="max-w-3xl font-display text-3xl font-semibold leading-tight tracking-tight text-balance md:text-5xl">
                {title}
              </h2>
            )}
          </motion.div>
        )}
        <div className={contentClassName}>{children}</div>
      </div>
    </section>
  )
}
