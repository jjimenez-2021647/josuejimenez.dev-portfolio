import { motion } from "framer-motion"

/** Barra de progreso animada para representar el nivel de una skill. */
export default function ProgressBar({ label, level }) {
  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm text-[--color-foreground]">{label}</span>
        <span className="font-mono text-xs text-[--color-accent]">{level}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-[--color-surface-2]">
        <motion.div
          className="h-full rounded-full progress-star progress-star-white"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  )
}
