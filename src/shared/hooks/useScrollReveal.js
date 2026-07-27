/**
 * Variantes reutilizables de Framer Motion para animaciones de scroll reveal.
 * Se usan junto a <motion.div variants={...} initial="hidden" whileInView="show">.
 */

export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.9, ease: "easeOut" } },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

/** Contenedor que escalona la aparición de sus hijos. */
export const stagger = (staggerChildren = 0.12, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren },
  },
})

/** Props por defecto para whileInView. */
export const revealViewport = { once: true, amount: 0.25 }
