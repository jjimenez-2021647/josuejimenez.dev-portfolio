import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  GitBranch,
  Laptop,
} from "lucide-react"
import Button from "@/shared/components/ui/Button"
import { profile } from "@/shared/constants/profile"
import { socials } from "@/shared/constants/navigation"
import { fadeUp, stagger } from "@/shared/hooks/useScrollReveal"
import { useTranslation } from "@/shared/hooks/useTranslation"
import TypingText from "./TypingText"
import TechMarquee from "./TechMarquee"

const terminalLines = [
  ["pasion", "true"],
  ["disciplina", "true"],
  ["vision", "infinita"],
  ["mentalidad", "imparable"],
]

const heroVisuals = [
  {
    src: "/hero-visual-JJ-Expo.png",
    alt: "Presentacion de proyecto",
  },
  {
    src: "/profile.jpeg",
    alt: "Josué Gilberto Jiménez Ajtún",
  },
]

export default function Hero() {
  const [visualIndex, setVisualIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const t = useTranslation()
  const activeVisual = heroVisuals[visualIndex]
  const nextVisualIndex = (visualIndex + 1) % heroVisuals.length
  const previewVisual = heroVisuals[nextVisualIndex]

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })

  const navigateVisual = (step) => {
    setDirection(step)
    setVisualIndex((current) =>
      (current + step + heroVisuals.length) % heroVisuals.length,
    )
  }

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden pt-28">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-[rgba(56,189,248,0.10)] blur-3xl animate-aurora" />
        <div className="absolute left-10 top-1/4 h-3 w-3 rounded-full bg-[rgba(56,189,248,0.9)] opacity-70 animate-particle" />
        <div className="absolute left-24 top-1/2 h-2 w-2 rounded-full bg-[rgba(255,255,255,0.9)] opacity-75 animate-particle-slow" />
        <div className="absolute right-14 top-1/3 h-4 w-4 rounded-full bg-[rgba(56,189,248,0.5)] opacity-70 animate-particle" />
        <div className="absolute right-28 top-3/4 h-2 w-2 rounded-full bg-[rgba(255,255,255,0.75)] opacity-70 animate-particle-slow" />
        <div className="absolute left-1/3 top-3/4 h-1.5 w-1.5 rounded-full bg-[rgba(255,255,255,0.65)] opacity-75 animate-particle" />
        <div className="absolute right-2/5 top-1/5 h-2 w-2 rounded-full bg-[rgba(56,189,248,0.35)] opacity-70 animate-particle-slow" />
      </div>
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-16 md:px-10 lg:grid-cols-12 lg:gap-8 lg:pt-16">
        <motion.div
          variants={stagger(0.14)}
          initial="hidden"
          animate="show"
          className="lg:col-span-7"
        >
          <motion.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-[--color-border] bg-[--color-surface]/60 px-4 py-1.5 font-mono text-xs text-[--color-accent-soft] backdrop-blur">
              <Laptop size={13} className="text-[--color-accent]" />
              <span className="font-mono text-xs text-[--color-accent]">{profile.name.split(" ")[0]}</span>
              {t.hero.cta}
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="mt-6 font-display text-[15vw] font-bold leading-[0.9] tracking-tight text-balance sm:text-7xl lg:text-8xl"
          >
            {profile.name.split(" ").slice(0, 2).join(" ")}
            <br />
            <span className="text-gradient">
              {profile.name.split(" ").slice(2).join(" ")}
            </span>
          </motion.h1>

          <motion.div
            variants={fadeUp}
            className="mt-6 font-mono text-lg text-[--color-muted] md:text-xl"
          >
            <span className="text-[--color-accent]">{"> "}</span>
            <TypingText words={t.hero.typingWords} className="text-[--color-foreground]" />
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-md text-pretty leading-relaxed text-[--color-muted]"
          >
            {t.hero.tagline}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-4">
            <Button revealDelay={0.04} onClick={() => scrollTo("projects")}>Ver proyectos</Button>
            <Button revealDelay={0.12} variant="outline" onClick={() => scrollTo("contact")}>
              Contactame
            </Button>
            <a
              href={socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="rounded-full border border-[--color-border] p-3 text-[--color-muted] transition-colors hover:border-[--color-accent] hover:text-[--color-accent]"
            >
              <GitBranch size={18} />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 28 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="relative lg:col-span-5"
        >
          <div className="relative mx-auto max-w-sm sm:max-w-[31rem] px-2 sm:px-0 pb-12 sm:pb-16 lg:pb-20">
            <div className="absolute left-0 top-10 h-[25rem] w-[45%] rounded-[2.5rem] border border-[--color-border]/30 bg-[--color-background]/20 backdrop-blur-xl shadow-[0_45px_90px_-45px_rgba(56,189,248,0.55)]" />
            <div className="relative z-10 overflow-hidden rounded-[2.5rem] border border-[--color-border] bg-[--color-surface]/95 shadow-2xl shadow-[rgba(0,0,0,0.18)]">
              <div className="relative aspect-[4/5] overflow-hidden">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <motion.img
                    key={activeVisual.src}
                    custom={direction}
                    src={activeVisual.src}
                    alt={activeVisual.alt}
                    loading="eager"
                    initial={(dir) => ({
                      opacity: 0,
                      x: dir > 0 ? 90 : -90,
                      scale: 0.96,
                      filter: "blur(8px)",
                    })}
                    animate={{
                      opacity: 1,
                      x: 0,
                      scale: 1,
                      filter: "blur(0px)",
                    }}
                    exit={(dir) => ({
                      opacity: 0,
                      x: dir > 0 ? -90 : 90,
                      scale: 0.98,
                      filter: "blur(8px)",
                    })}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-[--color-background]/90 via-transparent to-transparent" />
                <div className="absolute left-3 bottom-3 sm:left-4 sm:bottom-4 rounded-full border border-[--color-border] bg-[--color-background]/80 px-3 py-1 text-xs text-[--color-muted] backdrop-blur">
                  {activeVisual.alt}
                </div>
              </div>
            </div>

            <div className="mt-3 sm:mt-4 flex flex-col items-center gap-3 text-sm text-[--color-muted] sm:flex-row sm:justify-between sm:gap-4">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={() => navigateVisual(-1)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[--color-border] bg-[--color-surface]/80 text-[--color-foreground] transition sm:h-10 sm:w-10 hover:bg-[--color-surface] hover:text-[--color-accent]"
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft size={14} className="sm:h-[18px] sm:w-[18px]" />
                </button>
                <button
                  type="button"
                  onClick={() => navigateVisual(1)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[--color-border] bg-[--color-surface]/80 text-[--color-foreground] transition sm:h-10 sm:w-10 hover:bg-[--color-surface] hover:text-[--color-accent]"
                  aria-label="Imagen siguiente"
                >
                  <ChevronRight size={14} className="sm:h-[18px] sm:w-[18px]" />
                </button>
              </div>
              <span className="text-xs sm:text-sm">Toca las flechas para ver otra vista</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-12 px-6 md:px-10">
        <TechMarquee />
      </div>
    </section>
  )
}
