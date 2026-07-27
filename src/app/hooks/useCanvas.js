import { useEffect, useRef } from "react"

export function useCanvas(draw, onResize) {
  const canvasRef = useRef(null)
  const frameRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext("2d")
    if (!context) return

    const dpr = window.devicePixelRatio || 1

    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect()
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (typeof onResize === "function") {
        onResize(width, height)
      }
    }

    resizeCanvas()

    const handleResize = () => resizeCanvas()
    window.addEventListener("resize", handleResize)

    const render = (timestamp) => {
      const { width, height } = canvas.getBoundingClientRect()
      draw(context, width, height, timestamp * 0.001)
      frameRef.current = requestAnimationFrame(render)
    }

    frameRef.current = requestAnimationFrame(render)

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
      window.removeEventListener("resize", handleResize)
    }
  }, [draw, onResize])

  return canvasRef
}
