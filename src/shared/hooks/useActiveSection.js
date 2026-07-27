import { useEffect, useState } from "react"

/**
 * Devuelve el id de la sección actualmente visible en el viewport.
 * @param {string[]} sectionIds - ids de las secciones a observar.
 */
export function useActiveSection(sectionIds) {
  const [active, setActive] = useState(sectionIds[0] ?? "")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [sectionIds])

  return active
}
