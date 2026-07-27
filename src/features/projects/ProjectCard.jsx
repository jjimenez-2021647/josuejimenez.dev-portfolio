import { motion } from "framer-motion"
import { ArrowUpRight, ExternalLink, GitBranch } from "lucide-react"
import Tag from "@/shared/components/ui/Tag"
import { fadeUp } from "@/shared/hooks/useScrollReveal"
import { getProjectImages } from "./ProjectGallery"

/** Tarjeta de proyecto con hover que revela detalles. */
export default function ProjectCard({ project, onOpen, className = "" }) {
  const images = getProjectImages(project)
  const cover = images[0] || "/placeholder.svg"
  const hasGallery = images.length > 1
  const demoHref = project.demo && project.demo !== "#" ? project.demo : project.repo

  return (
    <motion.article
      variants={fadeUp}
      onClick={() => {
        // Delay opening slightly to avoid the click event reaching the modal backdrop
        // (prevents modal opening then immediately closing on the same click).
        setTimeout(() => onOpen(project), 50)
      }}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-[--color-border] bg-[--color-surface] ${className}`}
    >
      {/* Imagen */}
      <div className="relative overflow-hidden">
        <img
          src={cover}
          alt={`Captura de ${project.title}`}
          onError={(e) => {
            e.currentTarget.src = "/placeholder.svg"
          }}
          className="aspect-video w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[--color-surface] via-transparent to-transparent opacity-90" />

        {hasGallery && (
          <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-white/10 bg-[--color-surface]/80 px-3 py-1 font-mono text-xs text-[--color-accent-soft] backdrop-blur">
            {images.slice(0, 5).map((image, index) => (
              <span
                key={`${image}-${index}`}
                className="h-1.5 w-1.5 rounded-full bg-current opacity-80"
              />
            ))}
            <span className="ml-1 text-[--color-muted]">{images.length}</span>
          </div>
        )}

        {/* Overlay hover */}
        <div className="absolute inset-0 flex items-end justify-end p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[--color-accent] text-[--color-background]">
            <ArrowUpRight size={20} />
          </span>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-xl font-semibold text-[--color-foreground]">
              {project.title}
            </h3>
            <p className="font-mono text-xs text-[--color-accent]">
              {project.subtitle}
            </p>
          </div>
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label={`Repositorio de ${project.title}`}
            className="rounded-full border border-[--color-border] p-2 text-[--color-muted] transition-colors hover:border-[--color-accent] hover:text-[--color-accent]"
          >
            <GitBranch size={16} />
          </a>
        </div>

        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-[--color-muted]">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.slice(0, 4).map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          <a
            href={demoHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-2 rounded-full border border-[--color-accent]/40 bg-[--color-accent]/10 px-3 py-1.5 text-xs font-medium text-[--color-accent] transition-colors hover:border-[--color-accent] hover:bg-[--color-accent]/20"
          >
            <ExternalLink size={14} /> Demo
          </a>
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-2 rounded-full border border-[--color-border] px-3 py-1.5 text-xs text-[--color-muted] transition-colors hover:border-[--color-accent] hover:text-[--color-accent]"
          >
            <GitBranch size={14} /> Repo
          </a>
        </div>
      </div>
    </motion.article>
  )
}
