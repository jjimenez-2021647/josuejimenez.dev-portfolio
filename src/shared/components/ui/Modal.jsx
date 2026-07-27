import { useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"
import { createPortal } from "react-dom"

/** Modal accesible con animación de entrada/salida. */
export default function Modal({ open, onClose, children, title }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose?.()
    if (open) {
      document.addEventListener("keydown", onKey)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open, onClose])

  if (typeof document === "undefined") return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100000] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && onClose?.()}
          />

          <motion.div
            className="relative z-[100002] max-h-[90vh] w-full max-w-[min(95vw,900px)] overflow-y-auto rounded-2xl border-2 border-[--color-border] bg-[--color-surface]/100 p-4 sm:p-6 glow-ring pointer-events-auto"
            style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.6)" }}
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-2 text-[--color-muted] transition-colors hover:bg-[--color-surface-2] hover:text-[--color-foreground]"
              aria-label="Cerrar"
            >
              <X size={18} />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
