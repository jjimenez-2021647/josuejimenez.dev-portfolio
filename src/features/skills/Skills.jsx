import { motion } from "framer-motion"
import { ClipboardList, Layers, Rocket, Server, Users, Wrench } from "lucide-react"
import SectionWrapper from "@/shared/components/layout/SectionWrapper"
import Badge from "@/shared/components/ui/Badge"
import Card from "@/shared/components/ui/Card"
import ProgressBar from "@/shared/components/ui/ProgressBar"
import { agileProfile, skillGroups } from "@/shared/constants/skills"
import { fadeUp, stagger, revealViewport } from "@/shared/hooks/useScrollReveal"

const groupIcons = [Layers, Server, Wrench, Rocket]

export default function Skills() {
  return (
    <SectionWrapper
      id="skills"
      index={2}
      eyebrow="Habilidades"
      title="Herramientas con las que construyo."
    >
      <motion.div
        variants={stagger(0.12)}
        initial="hidden"
        whileInView="show"
        viewport={revealViewport}
        className="grid gap-6 md:grid-cols-2 xl:grid-cols-4"
      >
        {skillGroups.map((group, gi) => {
          const Icon = groupIcons[gi % groupIcons.length]
          return (
            <motion.div key={group.title} variants={fadeUp}>
              <Card glow className="h-full">
                <div className="mb-6 flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[--color-surface-2] text-[--color-accent]">
                    <Icon size={20} />
                  </span>
                  <h3 className="font-display text-lg font-semibold">{group.title}</h3>
                </div>
                <div className="flex flex-col gap-5">
                  {group.skills.map((skill) => (
                    <ProgressBar
                      key={skill.name}
                      label={skill.name}
                      level={skill.level}
                    />
                  ))}
                </div>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>

      <motion.div
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={revealViewport}
        className="mt-8 grid gap-6"
      >
        <div className="grid gap-6 lg:grid-cols-2">
          <motion.div variants={fadeUp}>
            <Card className="h-full">
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[--color-surface-2] text-[--color-accent]">
                  <Users size={20} />
                </span>
                <div>
                  <p className="font-mono text-xs uppercase tracking-wide text-[--color-muted-2]">
                    Metodologia agil
                  </p>
                  <h3 className="font-display text-lg font-semibold">
                    {agileProfile.methodology}
                  </h3>
                </div>
              </div>

              <div className="mb-6 flex flex-wrap gap-2">
                {agileProfile.roles.map((role) => (
                  <Badge key={role}>{role}</Badge>
                ))}
              </div>

              <div className="mb-6 rounded-3xl bg-[--color-background]/30 p-5 text-sm text-[--color-muted]">
                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.24em] text-[--color-muted-2]">
                  Como Scrum Master
                </p>
                <ul className="space-y-3">
                  <li className="flex gap-3">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[--color-accent]" />
                    Coordinación de sprints y definición de objetivos claros para el equipo.
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[--color-accent]" />
                    Facilito reuniones diarias, revisiones y retrospectivas para impulsar mejoras.
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[--color-accent]" />
                    Elimino impedimentos y mantengo la comunicación fluida entre desarrollo y producto.
                  </li>
                </ul>
              </div>

              <p className="text-sm leading-relaxed text-[--color-muted]">
                He participado en proyectos como Scrum Master, Product Owner y
                Desarrollador Full Stack, conectando la planificación del producto
                con la implementación técnica.
              </p>
            </Card>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Card className="h-full">
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[--color-surface-2] text-[--color-accent]">
                  <ClipboardList size={20} />
                </span>
                <div>
                  <p className="font-mono text-xs uppercase tracking-wide text-[--color-muted-2]">
                    Responsabilidades
                  </p>
                  <h3 className="font-display text-lg font-semibold">
                    Lo que llevo a cabo
                  </h3>
                </div>
              </div>

              <ul className="space-y-3 text-sm leading-relaxed text-[--color-muted]">
                {agileProfile.responsibilities.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[--color-accent]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        </div>

        <motion.div variants={fadeUp}>
          <Card className="h-full">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[--color-surface-2] text-[--color-accent]">
                <ClipboardList size={20} />
              </span>
              <div>
                <p className="font-mono text-xs uppercase tracking-wide text-[--color-muted-2]">
                  Fortalezas
                </p>
                <h3 className="font-display text-lg font-semibold">
                  Qué aporto al equipo
                </h3>
              </div>
            </div>

            <ul className="space-y-3 text-sm leading-relaxed text-[--color-muted]">
              {agileProfile.strengths.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[--color-accent]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  )
}
