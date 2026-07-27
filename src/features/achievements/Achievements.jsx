import { useState } from "react"
import { motion } from "framer-motion"
import { Award, Image, Medal, Trophy, Download } from "lucide-react"
import SectionWrapper from "@/shared/components/layout/SectionWrapper"
import Card from "@/shared/components/ui/Card"
import Modal from "@/shared/components/ui/Modal"
import { achievements, stats, certificates } from "@/shared/constants/achievements"
import { fadeUp, revealViewport, stagger } from "@/shared/hooks/useScrollReveal"
import CountUp from "./CountUp"

const icons = [Trophy, Award, Medal]

function getAchievementImages(item) {
  const images = item?.images?.length ? item.images : [item?.image]
  return images.filter(Boolean)
}

export default function Achievements() {
  const [selected, setSelected] = useState(null)

  return (
    <SectionWrapper
      id="achievements"
      index={5}
      eyebrow="Logros"
      title="Numeros y reconocimientos."
    >
      <motion.div
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={revealViewport}
        className="grid grid-cols-2 gap-4 md:grid-cols-4"
      >
        {stats.map((stat) => (
          <motion.div key={stat.label} variants={fadeUp}>
            <Card className="text-center hover:border-[--color-accent]">
              <p className="font-display text-4xl font-bold text-gradient md:text-5xl">
                <CountUp value={stat.value} />
              </p>
              <p className="mt-2 text-sm text-[--color-muted]">{stat.label}</p>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={stagger(0.12)}
        initial="hidden"
        whileInView="show"
        viewport={revealViewport}
        className="mt-6 grid gap-6 md:grid-cols-3"
      >
        {achievements.map((item, i) => {
          const Icon = icons[i % icons.length]
          const images = getAchievementImages(item)
          const cover = images[0]
          return (
            <motion.div key={item.title} variants={fadeUp}>
              <button
                type="button"
                onClick={() => cover && setSelected(item)}
                className="h-full w-full text-left"
                aria-label={cover ? `Ver diploma de ${item.title}` : item.title}
              >
                <Card
                  glow
                  className={`h-full overflow-hidden p-0 transition-transform duration-300 ${cover ? "hover:-translate-y-1" : ""}`}
                >
                  {cover ? (
                    <div className="relative overflow-hidden border-b border-[--color-border] bg-[--color-surface-2]">
                      <img
                        src={cover}
                        alt={`Diploma o reconocimiento de ${item.title}`}
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg"
                        }}
                        className="aspect-video w-full object-cover opacity-85 transition duration-500 hover:scale-105 hover:opacity-100"
                      />
                      <span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-[--color-surface]/80 text-[--color-accent] backdrop-blur">
                        <Image size={16} />
                      </span>
                    </div>
                  ) : (
                    <div className="p-6 pb-0">
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[--color-surface-2] text-[--color-accent]">
                        <Icon size={22} />
                      </span>
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-center gap-2 font-mono text-xs text-[--color-muted-2]">
                      {item.year} / {item.org}
                    </div>
                    <h4 className="mt-1 font-display text-lg font-semibold">
                      {item.title}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-[--color-muted]">
                      {item.description}
                    </p>
                  </div>
                </Card>
              </button>
            </motion.div>
          )
        })}
      </motion.div>

      <div className="mt-10">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-[--color-accent]">
          Certificados
        </p>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {certificates.map((cert) => (
            <Card key={cert.title} glow className="overflow-hidden p-0">
              <div className="relative overflow-hidden bg-[--color-surface-2]">
                <img
                  src={cert.image}
                  alt={`Certificado de ${cert.title}`}
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg"
                  }}
                  className="aspect-[4/3] w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h4 className="font-display text-lg font-semibold">
                  {cert.title}
                </h4>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-[--color-muted-2]">
                  <span>{cert.year}</span>
                  <span>•</span>
                  <span>{cert.org}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[--color-muted]">
                  {cert.description}
                </p>
                <div className="mt-5 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-full border border-[--color-border] bg-transparent px-4 py-2 text-sm text-[--color-foreground] transition hover:border-[--color-accent] hover:text-[--color-accent]"
                    onClick={() => setSelected(cert)}
                  >
                    <Image size={16} />
                    Ver imagen
                  </button>
                  <a
                    href={cert.pdf}
                    download
                    className="inline-flex items-center gap-2 rounded-full bg-[--color-accent] px-4 py-2 text-sm font-semibold text-[--color-background] transition hover:bg-[--color-accent-soft]"
                  >
                    <Download size={16} />
                    Descargar PDF
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.title}
      >
        {selected && (
          <div>
            <img
              src={getAchievementImages(selected)[0]}
              alt={`Diploma o reconocimiento de ${selected.title}`}
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg"
              }}
              className="w-full rounded-xl border border-[--color-border] bg-[--color-surface-2] object-contain"
            />
            <div className="mt-5 font-mono text-xs text-[--color-muted-2]">
              {selected.year} / {selected.org}
            </div>
            <h3 className="mt-1 font-display text-2xl font-semibold">
              {selected.title}
            </h3>
            <p className="mt-3 leading-relaxed text-[--color-muted]">
              {selected.description}
            </p>
          </div>
        )}
      </Modal>
    </SectionWrapper>
  )
}
