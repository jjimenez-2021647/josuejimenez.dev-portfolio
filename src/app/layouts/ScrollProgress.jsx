import { motion, useScroll, useSpring } from "framer-motion"

/** Barra superior que indica el progreso de scroll de la página. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left"
    >
      <div
        className="h-full w-full"
        style={{
          background: "linear-gradient(90deg, var(--color-accent), var(--color-primary))",
        }}
      />
    </motion.div>
  )
}
