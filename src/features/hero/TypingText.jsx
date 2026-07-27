import { useEffect, useState } from "react"

/** Efecto de máquina de escribir que alterna entre varias frases. */
export default function TypingText({ words = [], className = "" }) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState("")
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[index % words.length]
    const speed = deleting ? 45 : 90

    const timeout = setTimeout(() => {
      setText((prev) =>
        deleting
          ? current.slice(0, prev.length - 1)
          : current.slice(0, prev.length + 1),
      )

      if (!deleting && text === current) {
        setTimeout(() => setDeleting(true), 1400)
      } else if (deleting && text === "") {
        setDeleting(false)
        setIndex((i) => i + 1)
      }
    }, speed)

    return () => clearTimeout(timeout)
  }, [text, deleting, index, words])

  return (
    <span className={className}>
      {text}
      <span className="animate-blink text-[--color-accent]">_</span>
    </span>
  )
}
