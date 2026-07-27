"use client"

import { useEffect, useRef } from "react"

export function Starfield() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let W = 0
    let H = 0
    let DPR = 1
    let layers = []
    let animId = null
    let mouse = { x: 0, y: 0 }
    let smoothMouse = { x: 0, y: 0 }
    let shooters = []
    let nextShooter = 20 + Math.random() * 40

    function buildStars() {
      const density = (window.innerWidth * window.innerHeight) / 4200
      layers = [
        { depth: 0.15, size: [0.7, 1.3], alpha: [0.22, 0.45], speed: 0.02, stars: [] },
        { depth: 0.35, size: [1.1, 2.0], alpha: [0.28, 0.55], speed: 0.05, stars: [] },
        { depth: 0.7, size: [1.7, 3.0], alpha: [0.45, 0.88], speed: 0.1, stars: [] },
      ]

      layers.forEach((layer, li) => {
        const n = Math.floor(density * (li + 1) * 0.4)
        layer.stars = []
        for (let i = 0; i < n; i++) {
          layer.stars.push({
            x: Math.random() * W,
            y: Math.random() * H,
            r:
              (layer.size[0] + Math.random() * (layer.size[1] - layer.size[0])) * DPR,
            baseAlpha:
              layer.alpha[0] + Math.random() * (layer.alpha[1] - layer.alpha[0]),
            tw: Math.random() * Math.PI * 2,
            twSpeed: 0.01 + Math.random() * 0.025,
            warm: Math.random() < 0.14,
          })
        }
      })
    }

    function resize() {
      DPR = Math.min(window.devicePixelRatio || 1, 2)
      W = canvas.width = window.innerWidth * DPR
      H = canvas.height = window.innerHeight * DPR
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      buildStars()
    }

    function spawnShooter() {
      const y0 = Math.random() * H * 0.45
      const x0 = Math.random() * W * 0.6 + W * 0.2
      const angle = Math.PI * 0.78
      shooters.push({
        x: x0,
        y: y0,
        vx: Math.cos(angle) * (9 + Math.random() * 5) * DPR,
        vy: Math.sin(angle) * (9 + Math.random() * 5) * DPR,
        life: 0,
        maxLife: 40 + Math.random() * 20,
      })
    }

    function handleMouseMove(e) {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2
    }

    function drawStar(cx, cy, r, color, alpha, sparkle) {
      ctx.beginPath()
      ctx.fillStyle = `rgba(${color},${alpha})`
      ctx.arc(cx, cy, r * 0.55, 0, Math.PI * 2)
      ctx.fill()

      if (!sparkle) return

      const long = r * 2.2
      const short = r * 0.55

      const spike = (x1, y1, x2, y2, x3, y3, x4, y4) => {
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.lineTo(x3, y3)
        ctx.lineTo(x4, y4)
        ctx.closePath()
        ctx.fill()
      }

      ctx.fillStyle = `rgba(${color},${alpha * 0.6})`
      spike(
        cx,
        cy - long,
        cx - short * 0.35,
        cy,
        cx,
        cy + long,
        cx + short * 0.35,
        cy,
      )
      spike(
        cx - long,
        cy,
        cx,
        cy - short * 0.35,
        cx + long,
        cy,
        cx,
        cy + short * 0.35,
      )
    }

    function step() {
      ctx.clearRect(0, 0, W, H)
      ctx.fillStyle = "rgba(2, 4, 18, 0.95)"
      ctx.fillRect(0, 0, W, H)

      smoothMouse.x += (mouse.x - smoothMouse.x) * 0.045
      smoothMouse.y += (mouse.y - smoothMouse.y) * 0.045

      for (const layer of layers) {
        const px = smoothMouse.x * layer.depth * 26 * DPR
        const py = smoothMouse.y * layer.depth * 26 * DPR

        for (const s of layer.stars) {
          s.tw += s.twSpeed
          s.y += layer.speed * DPR * 0.4
          if (s.y > H) s.y = 0

          const flicker = 0.6 + Math.sin(s.tw) * 0.4
          const alpha = s.baseAlpha * flicker
          const color = s.warm ? "255,230,210" : "255,255,255"

          ctx.shadowColor = `rgba(${color},0.9)`
          ctx.shadowBlur = s.r * 1.4
          drawStar(s.x + px, s.y + py, s.r, color, alpha, layer.depth > 0.5)
        }
      }

      ctx.shadowBlur = 0
      nextShooter--
      if (nextShooter <= 0 && !reduceMotion) {
        spawnShooter()
        nextShooter = 35 + Math.random() * 55
      }

      for (let i = shooters.length - 1; i >= 0; i--) {
        const s = shooters[i]
        s.x += s.vx
        s.y += s.vy
        s.life++
        const t = s.life / s.maxLife
        const alpha = t < 0.2 ? t / 0.2 : 1 - t
        const tailX = s.x - s.vx * 3.2
        const tailY = s.y - s.vy * 3.2
        const grad = ctx.createLinearGradient(s.x, s.y, tailX, tailY)
        grad.addColorStop(0, `rgba(255,255,255,${alpha})`)
        grad.addColorStop(1, "rgba(255,255,255,0)")
        ctx.strokeStyle = grad
        ctx.lineWidth = 2 * DPR
        ctx.beginPath()
        ctx.moveTo(s.x, s.y)
        ctx.lineTo(tailX, tailY)
        ctx.stroke()
        if (s.life > s.maxLife) shooters.splice(i, 1)
      }

      if (!reduceMotion) animId = requestAnimationFrame(step)
    }

    resize()
    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", handleMouseMove)
    if (!reduceMotion) step()

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
      if (animId) cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-[#050810]">
      <div
        className="absolute inset-0 animate-[nebula-drift_24s_ease-in-out_infinite_alternate]"
        style={{
          background: `
            radial-gradient(700px 500px at 15% 20%, rgba(255,255,255,0.03), transparent 60%),
            radial-gradient(600px 600px at 88% 78%, rgba(255,255,255,0.025), transparent 60%),
            #000000
          `,
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <style>{`
        @keyframes nebula-drift {
          0%   { filter: hue-rotate(0deg) brightness(1); }
          100% { filter: hue-rotate(8deg) brightness(1.08); }
        }
      `}</style>
    </div>
  )
}
