import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/shared/utils/cn"

export function getProjectImages(project) {
  const images = project?.images?.length ? project.images : [project?.image]
  return images.filter(Boolean)
}

export default function ProjectGallery({ project }) {
  const images = useMemo(() => getProjectImages(project), [project])
  const [active, setActive] = useState(0)
  const hasMany = images.length > 1

  useEffect(() => {
    setActive(0)
  }, [project])

  useEffect(() => {
    if (!hasMany) return undefined

    const onKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        setActive((index) => (index - 1 + images.length) % images.length)
      }

      if (e.key === "ArrowRight") {
        setActive((index) => (index + 1) % images.length)
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [hasMany, images.length])

  const goTo = (direction) => {
    setActive((index) => (index + direction + images.length) % images.length)
  }

  return (
    <div>
      <div className="relative overflow-hidden rounded-xl border border-[--color-border] bg-[--color-surface-2]">
        <AnimatePresence mode="wait">
          <motion.img
            key={images[active]}
            src={images[active] || "/placeholder.svg"}
            alt={`Captura ${active + 1} de ${project.title}`}
            onError={(e) => {
              e.currentTarget.src = "/placeholder.svg"
            }}
            className="aspect-video w-full object-cover"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          />
        </AnimatePresence>

        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-[--color-background]/90 to-transparent p-4 pt-14">
          <span className="rounded-full border border-white/10 bg-[--color-surface]/80 px-3 py-1 font-mono text-xs text-[--color-muted] backdrop-blur">
            {String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
          </span>

          {hasMany && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => goTo(-1)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[--color-surface]/80 text-[--color-foreground] backdrop-blur transition-colors hover:border-[--color-accent] hover:text-[--color-accent]"
                aria-label="Imagen anterior"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => goTo(1)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[--color-surface]/80 text-[--color-foreground] backdrop-blur transition-colors hover:border-[--color-accent] hover:text-[--color-accent]"
                aria-label="Imagen siguiente"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>

      {hasMany && (
        <div className="mt-3 grid grid-cols-3 sm:grid-cols-5 gap-2">
          {images.slice(0, 5).map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setActive(index)}
              className={cn(
                "overflow-hidden rounded-lg border bg-[--color-surface-2] transition-colors",
                active === index
                  ? "border-[--color-accent]"
                  : "border-[--color-border] hover:border-[--color-muted]",
              )}
              aria-label={`Ver captura ${index + 1}`}
            >
              <img
                src={image}
                alt=""
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg"
                }}
                className="aspect-video w-full object-cover opacity-80 transition-opacity hover:opacity-100"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
