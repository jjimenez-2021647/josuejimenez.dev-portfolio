import { techStack } from "@/shared/constants/skills"

/** Cinta infinita de tecnologías con 3 filas:
 *  - fila superior: nombres
 *  - fila central: iconos/badges (iniciales)
 *  - fila inferior: nombres
 */
function initialsFor(tech) {
  const parts = tech.split(/\s|\.|-/).filter(Boolean)
  if (parts.length === 1) return parts[0].slice(0, 3).toUpperCase()
  return (parts[0][0] + (parts[1] ? parts[1][0] : "")).toUpperCase()
}

function IconFor(tech) {
  const key = tech.toLowerCase()
  const title = tech
  if (/react/.test(key)) {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-label={title}>
        <circle cx="12" cy="12" r="2" fill="var(--color-accent)" />
        <g stroke="var(--color-accent)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="12" rx="7" ry="3" transform="rotate(0 12 12)" />
          <ellipse cx="12" cy="12" rx="7" ry="3" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="7" ry="3" transform="rotate(120 12 12)" />
        </g>
      </svg>
    )
  }
  if (/java/.test(key)) {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-label={title}>
        <path d="M8 17c2 1 6 1 8 0" stroke="var(--color-accent)" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M10 7s1 1 0 2c-1 1-1 2 2 3" stroke="var(--color-accent)" strokeWidth="1" strokeLinecap="round" />
        <rect x="6" y="14" width="12" height="3" rx="1" fill="var(--color-accent)" opacity="0.12" />
      </svg>
    )
  }
  if (/node/.test(key)) {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-label={title}>
        <polygon points="12 2 20 6.5 20 17.5 12 22 4 17.5 4 6.5" stroke="var(--color-accent)" strokeWidth="1" fill="var(--color-background)" />
        <text x="12" y="15" textAnchor="middle" fontSize="6" fill="var(--color-accent)" fontWeight="700">node</text>
      </svg>
    )
  }
  if (/tailwind/.test(key)) {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-label={title}>
        <path d="M2 12c6 0 6-6 12-6 2 0 4 2 4 4" stroke="var(--color-accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  if (/postgre|postgres/.test(key)) {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-label={title}>
        <path d="M4 12c4-6 12-6 16 0" stroke="var(--color-accent)" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="8" cy="14" r="1.6" fill="var(--color-accent)" />
      </svg>
    )
  }
  if (/mongo/.test(key)) {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-label={title}>
        <path d="M12 2c0 6-6 6-6 12 0 2 6 4 6 4s6-2 6-4c0-6-6-6-6-12z" fill="var(--color-accent)" opacity="0.14" />
        <path d="M9 8c1-2 3-2 3-2s-1 2-1 3c0 1-2 0-2-1z" stroke="var(--color-accent)" strokeWidth="1" />
      </svg>
    )
  }
  if (/git/.test(key) && !/github/.test(key)) {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-label={title}>
        <path d="M3 12.5l7-7 4 4 6-6" stroke="var(--color-accent)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )
  }
  if (/github/.test(key)) {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-label={title}>
        <path d="M12 2C9 2 6.5 4 6.5 7c0 2.5 1.6 4 3.2 4.6.2.1.3.3.3.6v1c-1 .2-1.8-.3-2-1.1-1 0-1.6-.3-2 0 0 .6.2 1.1.5 1.6 1.2 1.6 3 2.2 5 2.2s3.8-.6 5-2.2c.3-.5.5-1 .5-1.6-.4-.3-1-.1-2 0-.2.8-1 1.3-2 1.1v-1c0-.3.1-.5.3-.6C16 11 17.5 9.5 17.5 7c0-3-2.5-5-5.5-5z" fill="var(--color-accent)" />
      </svg>
    )
  }
  if (/postman/.test(key)) {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-label={title}>
        <path d="M4 12l6-6 6 6-6 6-6-6z" stroke="var(--color-accent)" strokeWidth="1" fill="var(--color-accent)" opacity="0.12" />
        <path d="M9 9l6 6" stroke="var(--color-accent)" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    )
  }
  if (/figma/.test(key)) {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-label={title}>
        <rect x="8" y="4" width="4" height="4" rx="2" fill="var(--color-accent)" />
        <circle cx="10" cy="12" r="2" fill="var(--color-accent)" opacity="0.9" />
      </svg>
    )
  }

  // Fallback: svg circle with initials
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" aria-label={title}>
      <circle cx="18" cy="18" r="16" fill="var(--color-background)" stroke="var(--color-border)" />
      <text x="18" y="22" textAnchor="middle" fontSize="10" fill="var(--color-accent)" fontWeight="700">{initialsFor(tech)}</text>
    </svg>
  )
}

export default function TechMarquee() {
  const items = [...techStack, ...techStack]

  return (
    <div className="relative overflow-hidden border-y border-[--color-border] py-4 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className="flex flex-col gap-3">
        {/* Top row: nombres */}
        <div className="animate-marquee flex w-max items-center gap-12">
          {items.map((tech, i) => (
            <span
              key={`r1-${i}`}
              className="flex items-center gap-3 font-mono text-sm text-[--color-muted] opacity-95"
            >
              <span className="hidden sm:inline">{tech}</span>
              <span className="text-[--color-accent]">•</span>
            </span>
          ))}
        </div>

        {/* Middle row: badges con iniciales (parecen iconos) */}
        <div
          className="animate-marquee flex w-max items-center gap-6"
          style={{ animationDirection: "reverse", animationDuration: "28s" }}
        >
          {items.map((tech, i) => (
            <div key={`r2-${i}`} className="flex items-center justify-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[--color-background]/40 text-xs font-semibold text-[--color-accent] shadow-md">
                {IconFor(tech)}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom row: nombres (más sutil) */}
        <div className="animate-marquee flex w-max items-center gap-12" style={{ animationDuration: "36s" }}>
          {items.map((tech, i) => (
            <span
              key={`r3-${i}`}
              className="flex items-center gap-3 font-mono text-sm text-[--color-muted] opacity-80"
            >
              <span className="hidden sm:inline">{tech}</span>
              <span className="text-[--color-accent]">•</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
