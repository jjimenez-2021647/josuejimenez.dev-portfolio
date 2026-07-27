import { useEffect, useMemo, useRef, useState } from "react"
import { useInView } from "framer-motion"

/**
 * Anima un número desde 0 hasta su valor. Conserva prefijos/sufijos
 * como "+", "%", etc. (ej. "15+", "+20", "100%", "1,200+").
 */
export default function CountUp({ value }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.35 })

  const parsed = useMemo(() => {
    const raw = String(value).trim()
    const match = raw.match(/^(.*?)(-?\d[\d,.]*)(.*)$/)

    if (!match) {
      return { numeric: false, display: raw }
    }

    const [, prefix, number, suffix] = match
    const normalized = number.replace(/,/g, "")
    const target = Number(normalized)

    if (!Number.isFinite(target)) {
      return { numeric: false, display: raw }
    }

    return {
      numeric: true,
      prefix,
      suffix,
      target,
      decimals: normalized.includes(".") ? normalized.split(".")[1].length : 0,
      usesComma: number.includes(","),
    }
  }, [value])

  const [display, setDisplay] = useState(() =>
    parsed.numeric ? `${parsed.prefix}0${parsed.suffix}` : parsed.display,
  )

  useEffect(() => {
    if (!parsed.numeric) {
      setDisplay(parsed.display)
      return undefined
    }

    if (!inView) {
      setDisplay(`${parsed.prefix}0${parsed.suffix}`)
      return
    }

    let raf
    const duration = 1400
    const start = performance.now()

    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      const current = eased * parsed.target
      const formatted = parsed.decimals
        ? current.toFixed(parsed.decimals)
        : Math.round(current).toLocaleString("en-US", {
            useGrouping: parsed.usesComma,
          })

      setDisplay(`${parsed.prefix}${formatted}${parsed.suffix}`)
      if (p < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, parsed])

  return (
    <span ref={ref} className="inline-block min-w-[3ch] tabular-nums">
      {display}
    </span>
  )
}
