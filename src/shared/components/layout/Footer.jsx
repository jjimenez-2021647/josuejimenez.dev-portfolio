import { ArrowDownCircle, GitBranch, Network, Briefcase, ArrowUp } from "lucide-react"
import Button from "@/shared/components/ui/Button"
import { navLinks, socials } from "@/shared/constants/navigation"
import { profile } from "@/shared/constants/profile"

export default function Footer() {
  const year = new Date().getFullYear()

  const scrollTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" })

  const scrollTo = (e, id) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <footer className="border-t border-[--color-border] px-6 py-12 md:px-10">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1fr_auto_1fr] md:items-center">
        <div className="text-center md:text-left">
          <p className="font-display text-lg font-semibold">{profile.name}</p>
          <p className="font-mono text-sm text-[--color-muted]">
            {profile.role}
          </p>
        </div>

        <nav aria-label="Navegación de pie de página">
          <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-mono text-xs text-[--color-muted]">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(e) => scrollTo(e, link.id)}
                  className="transition-colors hover:text-[--color-accent]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center justify-center gap-3 md:justify-end">
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="rounded-full border border-[--color-border] p-3 text-[--color-muted] transition-colors hover:border-[--color-accent] hover:text-[--color-accent]"
          >
            <Network size={18} />
          </a>
          <a
            href="#"
            aria-label="CompuTrabajo"
            className="rounded-full border border-[--color-border] p-3 text-[--color-muted] transition-colors hover:border-[--color-accent] hover:text-[--color-accent]"
          >
            <Briefcase size={18} />
          </a>
          <a
            href={socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="rounded-full border border-[--color-border] p-3 text-[--color-muted] transition-colors hover:border-[--color-accent] hover:text-[--color-accent]"
          >
            <GitBranch size={18} />
          </a>
          <Button
            revealDelay={0.08}
            href="/Josue-Gilberto-Jimenez-Ajtun-CV.pdf"
            download="CV-Josue-Gilberto-Jimenez-Ajtun.pdf"
            variant="outline"
            className="hidden md:inline-flex"
          >
            <ArrowDownCircle size={16} /> CV
          </Button>
        </div>
      </div>

      <div className="mx-auto mt-8 flex max-w-6xl flex-col items-center justify-between gap-4 border-t border-[--color-border] pt-6 text-center sm:flex-row sm:text-left">
        <p className="font-mono text-xs text-[--color-muted-2]">
          © {year} · Diseñado y desarrollado con React
        </p>
        <button
          type="button"
          onClick={scrollTop}
          className="flex items-center gap-2 font-mono text-xs text-[--color-muted] transition-colors hover:text-[--color-accent]"
        >
          Volver arriba <ArrowUp size={14} />
        </button>
      </div>
    </footer>
  )
}
