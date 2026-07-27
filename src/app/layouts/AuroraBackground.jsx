import { useMousePosition } from "@/app/hooks/useMousePosition"

/**
 * Fondo global: grid blueprint + manchas aurora animadas +
 * halo que sigue al cursor. Todo fijo y detrás del contenido.
 */
export default function AuroraBackground() {
  const { x, y } = useMousePosition()

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[--color-background]">
      {/* Grid blueprint */}
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      {/* Manchas aurora */}
      <div
        className="animate-aurora absolute -left-40 -top-40 h-[38rem] w-[38rem] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(37,99,235,0.35), transparent 70%)" }}
      />
      <div
        className="animate-aurora absolute -right-40 top-1/3 h-[34rem] w-[34rem] rounded-full blur-[120px]"
        style={{
          background: "radial-gradient(circle, rgba(56,189,248,0.28), transparent 70%)",
          animationDelay: "-5s",
        }}
      />
      <div
        className="animate-aurora absolute bottom-0 left-1/3 h-[30rem] w-[30rem] rounded-full blur-[120px]"
        style={{
          background: "radial-gradient(circle, rgba(29,78,216,0.25), transparent 70%)",
          animationDelay: "-9s",
        }}
      />

      {/* Halo que sigue al cursor (oculto en táctil) */}
      <div
        className="absolute hidden h-80 w-80 rounded-full blur-[90px] transition-transform duration-200 ease-out md:block"
        style={{
          background: "radial-gradient(circle, rgba(56,189,248,0.14), transparent 70%)",
          transform: `translate(${x - 160}px, ${y - 160}px)`,
        }}
      />

      {/* Partículas parpadeantes globales */}
      <div className="absolute inset-0">
        <div className="absolute left-10 top-12 h-2 w-2 rounded-full bg-[rgba(255,255,255,0.85)] opacity-0 animate-particle-blink" />
        <div className="absolute left-1/4 top-1/3 h-1.5 w-1.5 rounded-full bg-[rgba(56,189,248,0.8)] opacity-0 animate-particle-blink delay-200" />
        <div className="absolute right-16 top-1/4 h-2 w-2 rounded-full bg-[rgba(255,255,255,0.75)] opacity-0 animate-particle-blink delay-400" />
        <div className="absolute right-28 bottom-1/3 h-1.5 w-1.5 rounded-full bg-[rgba(56,189,248,0.45)] opacity-0 animate-particle-blink delay-600" />
        <div className="absolute left-1/3 bottom-20 h-2 w-2 rounded-full bg-[rgba(255,255,255,0.65)] opacity-0 animate-particle-blink delay-800" />
        <div className="absolute left-2/3 top-2/5 h-1.5 w-1.5 rounded-full bg-[rgba(56,189,248,0.6)] opacity-0 animate-particle-blink delay-1000" />
      </div>

      {/* Viñeta superior/inferior */}
      <div className="absolute inset-0 bg-gradient-to-b from-[--color-background] via-transparent to-[--color-background]" />
    </div>
  )
}
