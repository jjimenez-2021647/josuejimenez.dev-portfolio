import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { navLinks } from "@/shared/constants/navigation"
import { profile } from "@/shared/constants/profile"
import { useActiveSection } from "@/shared/hooks/useActiveSection"
import { useLanguage } from "@/shared/context/LanguageContext"
import { useTranslation } from "@/shared/hooks/useTranslation"
import { cn } from "@/shared/utils/cn"

const sectionIds = navLinks.map((l) => l.id)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { setLang, lang } = useLanguage()
  const t = useTranslation()
  const active = useActiveSection(sectionIds)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false)
    }

    window.addEventListener("keydown", onKeyDown)
    return () => {
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [open])

  const handleClick = (e, id) => {
    e.preventDefault()
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  const initials = profile.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "relative fixed inset-x-0 top-0 z-50 border border-white/10 bg-[rgba(3,7,20,0.72)] backdrop-blur-xl shadow-[0_24px_80px_rgba(0,0,0,0.22)] transition-all duration-300",
          scrolled ? "backdrop-blur-2xl" : "",
        )}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
          <a
            href="#hero"
            onClick={(e) => handleClick(e, "hero")}
            className="flex items-center gap-2 font-display text-lg font-bold tracking-tight"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[--color-border] bg-[--color-surface] font-mono text-sm text-[--color-accent]">
              {initials}
            </span>
            <span className="hidden sm:block">{profile.name}</span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => handleClick(e, link.id)}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm transition-colors duration-200",
                    active === link.id
                      ? "text-[--color-foreground]"
                      : "text-[--color-muted] hover:text-[--color-foreground]",
                  )}
                >
                  {active === link.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-[--color-surface] ring-1 ring-[--color-border]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {t.nav[link.id]}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            onClick={(e) => handleClick(e, "contact")}
            className="hidden rounded-full bg-[--color-accent] px-5 py-2 font-mono text-sm font-medium text-[--color-background] transition-colors hover:bg-[--color-accent-soft] lg:inline-block"
          >
            {t.hero.buttonContact}
          </a>

          <div className="hidden items-center gap-2 lg:flex">
            <button
              type="button"
              className="rounded-full border border-[--color-border] bg-[--color-surface] px-3 py-2 text-sm font-mono text-[--color-foreground] transition hover:border-[--color-accent] hover:text-[--color-accent]"
              onClick={() => setLang(lang === "es" ? "en" : "es")}
            >
              {lang === "es" ? "EN" : "ES"}
            </button>
          </div>

          <button
            type="button"
            className="rounded-lg p-2 text-[--color-foreground] lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-0 top-20 z-40 px-6 lg:hidden"
          >
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-[rgba(3,7,20,0.92)] backdrop-blur-xl py-5 shadow-2xl shadow-[rgba(0,0,0,0.35)]">
              <ul
                id="mobile-navigation"
                className="flex flex-col items-center gap-3 px-6"
              >
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: 0.05 * i }}
                    className="w-full"
                  >
                    <a
                      href={`#${link.id}`}
                      onClick={(e) => handleClick(e, link.id)}
                      className={cn(
                        "block w-full rounded-full px-5 py-3 text-center text-lg font-medium transition-colors",
                        active === link.id
                          ? "bg-[--color-surface] text-[--color-accent]"
                          : "text-[--color-foreground] hover:bg-[--color-surface]/60 hover:text-[--color-accent]",
                      )}
                    >
                      {t.nav[link.id]}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
