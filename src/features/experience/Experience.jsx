import { motion } from "framer-motion"
import { Briefcase, GraduationCap } from "lucide-react"
import SectionWrapper from "@/shared/components/layout/SectionWrapper"
import Tag from "@/shared/components/ui/Tag"
import { education, experience } from "@/shared/constants/experience"
import { fadeUp, revealViewport, stagger } from "@/shared/hooks/useScrollReveal"

function Timeline({ items, showTags }) {
  return (
    <motion.ol
      variants={stagger(0.14)}
      initial="hidden"
      whileInView="show"
      viewport={revealViewport}
      className="relative ml-3 border-l border-[--color-border]"
    >
      {items.map((item, i) => (
        <motion.li key={i} variants={fadeUp} className="relative pb-10 pl-8 last:pb-0">
          <span className="absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-[--color-accent] bg-[--color-background]">
            <span className="absolute inset-0 animate-ping rounded-full bg-[--color-accent] opacity-30" />
          </span>
          <span className="font-mono text-xs text-[--color-accent]">{item.period}</span>
          <h4 className="mt-1 font-display text-lg font-semibold text-[--color-foreground]">
            {item.title}
          </h4>
          <p className="text-sm text-[--color-muted-2]">{item.place}</p>
          <p className="mt-2 text-sm leading-relaxed text-[--color-muted]">
            {item.description}
          </p>
          {showTags && item.tags && (
            <div className="mt-3 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          )}
        </motion.li>
      ))}
    </motion.ol>
  )
}

export default function Experience() {
  return (
    <SectionWrapper
      id="experience"
      index={3}
      eyebrow="Trayectoria"
      title="Educación y experiencia."
    >
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <div className="mb-8 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[--color-surface-2] text-[--color-accent]">
              <GraduationCap size={18} />
            </span>
            <h3 className="font-display text-xl font-semibold">Educación</h3>
          </div>
          <Timeline items={education} />
        </div>

        <div>
          <div className="mb-8 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[--color-surface-2] text-[--color-accent]">
              <Briefcase size={18} />
            </span>
            <h3 className="font-display text-xl font-semibold">Experiencia</h3>
          </div>
          <Timeline items={experience} showTags />
        </div>
      </div>
    </SectionWrapper>
  )
}
