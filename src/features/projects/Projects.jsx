import { useState } from "react"
import { motion } from "framer-motion"
import { GitBranch, ExternalLink, Lightbulb } from "lucide-react"
import SectionWrapper from "@/shared/components/layout/SectionWrapper"
import Modal from "@/shared/components/ui/Modal"
import Button from "@/shared/components/ui/Button"
import Tag from "@/shared/components/ui/Tag"
import ProjectCard from "./ProjectCard"
import ProjectGallery from "./ProjectGallery"
import { projects } from "@/shared/constants/projects"
import { stagger, revealViewport } from "@/shared/hooks/useScrollReveal"

export default function Projects() {
  const [selected, setSelected] = useState(null)
  const demoHref = selected?.demo && selected.demo !== "#" ? selected.demo : selected?.repo

  return (
    <SectionWrapper
      id="projects"
      index={4}
      eyebrow="Proyectos"
      title="Trabajo seleccionado."
    >
      <motion.div
        variants={stagger(0.12)}
        initial="hidden"
        whileInView="show"
        viewport={revealViewport}
        className="grid gap-6 md:grid-cols-2"
      >
        {projects.map((project, i) => (
          <ProjectCard
            key={project.title}
            project={project}
            onOpen={setSelected}
            className={project.featured && i < 2 ? "md:col-span-1" : ""}
          />
        ))}
      </motion.div>

      {/* Modal de detalle */}
      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.title}
      >
        {selected && (
          <div>
            <ProjectGallery project={selected} />

            <h3 className="mt-6 font-display text-2xl font-semibold">
              {selected.title}
            </h3>
            <p className="font-mono text-sm text-[--color-accent]">
              {selected.subtitle}
            </p>

            <p className="mt-4 leading-relaxed text-[--color-muted]">
              {selected.description}
            </p>

            <div className="mt-6">
              <p className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-wide text-[--color-muted-2]">
                <Lightbulb size={14} /> Aprendizajes
              </p>
              <ul className="flex flex-col gap-2">
                {selected.learned.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-[--color-foreground]"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[--color-accent]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {selected.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button revealDelay={0.06} href={selected.repo} target="_blank" rel="noopener noreferrer">
                <GitBranch size={16} /> Repositorio
              </Button>
              {demoHref && (
                <Button
                  revealDelay={0.12}
                  variant="outline"
                  href={demoHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink size={16} /> Demo
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </SectionWrapper>
  )
}
