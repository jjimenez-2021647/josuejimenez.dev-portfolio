import { motion } from "framer-motion"
import { MapPin, Calendar, Clock, GraduationCap, CircleDot, Mail } from "lucide-react"
import SectionWrapper from "@/shared/components/layout/SectionWrapper"
import Card from "@/shared/components/ui/Card"
import { profile } from "@/shared/constants/profile"
import { fadeUp, scaleIn, stagger, revealViewport } from "@/shared/hooks/useScrollReveal"

const detailIcons = {
  edad: Calendar,
  ubicacion: MapPin,
  experiencia: Clock,
  formacion: GraduationCap,
  disponibilidad: CircleDot,
  email: Mail,
}

const detailLabels = {
  edad: "Edad",
  ubicacion: "Ubicación",
  experiencia: "Experiencia",
  formacion: "Formación",
  disponibilidad: "Estado",
  email: "Email",
}

export default function About() {
  return (
    <SectionWrapper
      id="about"
      index={1}
      eyebrow="Sobre mí"
      title="Quién soy detrás del código."
      className="relative overflow-hidden"
    >
      <div className="grid gap-10 lg:grid-cols-12 items-stretch relative z-10">
        {/* Imagen / foto */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="lg:col-span-5 h-full"
        >
          <div className="glow-border h-full overflow-hidden rounded-[2rem] border border-[--color-border] bg-[--color-surface]/85 shadow-2xl shadow-[rgba(0,0,0,0.22)]">
            <div className="relative h-full overflow-hidden">
              <img
                src="/profile.jpeg"
                alt={`Retrato de ${profile.name}`}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[--color-background] to-transparent px-5 py-4">
                <p className="font-display text-lg font-semibold text-[--color-foreground]">{profile.name}</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[--color-accent]">{profile.role}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Texto */}
        <motion.div className="lg:col-span-7 flex flex-col">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="text-pretty text-xl leading-relaxed text-[--color-foreground] md:text-2xl"
          >
            {profile.about}
          </motion.p>

          <motion.blockquote
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="mt-8 border-l-2 border-[--color-accent] pl-5 font-mono text-[--color-muted]"
          >
            “{profile.phrase}”
          </motion.blockquote>
        </motion.div>
      </div>

      {/* Detalles: 2 filas x 3 columnas ocupando todo el ancho */}
      <motion.div
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={revealViewport}
        className="mt-10 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      >
        {Object.entries(profile.details).map(([key, value]) => {
          const Icon = detailIcons[key] ?? CircleDot
          return (
            <motion.div key={key} variants={fadeUp}>
              <Card className="flex items-center gap-4 p-4 hover:border-[--color-accent]">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[--color-surface-2] text-[--color-accent]">
                  <Icon size={18} />
                </span>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[--color-muted-2]">
                    {detailLabels[key] ?? key}
                  </p>
                  <p className="text-sm text-[--color-foreground]">{value}</p>
                </div>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>
    </SectionWrapper>
  )
}
