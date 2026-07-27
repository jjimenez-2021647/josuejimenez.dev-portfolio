import { useEffect, useState } from "react"

/** Rastrea la posición del mouse para efectos de glow/cursor. */
export function useMousePosition() {
  const [pos, setPos] = useState({ x: -200, y: -200 })

  useEffect(() => {
    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY })
    window.addEventListener("pointermove", onMove)
    return () => window.removeEventListener("pointermove", onMove)
  }, [])

  return pos
}
