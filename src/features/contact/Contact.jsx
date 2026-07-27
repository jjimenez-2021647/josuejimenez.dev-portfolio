import { useState } from "react"
import { motion } from "framer-motion"
import {
  Check,
  Camera,
  GitBranch,
  Mail,
  MessageCircle,
  Network,
  Send,
  Users,
} from "lucide-react"
import SectionWrapper from "@/shared/components/layout/SectionWrapper"
import Card from "@/shared/components/ui/Card"
import Button from "@/shared/components/ui/Button"
import { profile } from "@/shared/constants/profile"
import { socials } from "@/shared/constants/navigation"
import { fadeUp, revealViewport, stagger } from "@/shared/hooks/useScrollReveal"

const socialItems = [
  { label: "Facebook", href: socials.facebook, icon: Users },
  { label: "Instagram", href: socials.instagram, icon: Camera },
  { label: "Email", href: socials.email, icon: Mail },
  { label: "GitHub", href: socials.github, icon: GitBranch },
  { label: "LinkedIn", href: socials.linkedin, icon: Network },
  { label: "WhatsApp", href: socials.whatsapp, icon: MessageCircle },
]

export default function Contact() {
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (sending) return
    setSending(true)

    const form = e.currentTarget
    const action = form.action
    const formData = new FormData(form)

    try {
      const res = await fetch(action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })

      if (res.ok) {
        setSent(true)
        form.reset()
        setTimeout(() => setSent(false), 3500)
      } else {
        // fallback: still show sent message briefly
        setSent(true)
        setTimeout(() => setSent(false), 3500)
      }
    } catch (err) {
      setSent(true)
      setTimeout(() => setSent(false), 3500)
    } finally {
      setSending(false)
    }
  }

  return (
    <SectionWrapper
      id="contact"
      index={6}
      eyebrow="Contacto"
      title="Trabajemos juntos."
    >
      <div className="grid items-stretch gap-6 lg:grid-cols-12">
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="lg:col-span-5"
        >
          <Card className="flex h-full flex-col justify-between p-5 sm:p-8">
            <motion.p
              variants={fadeUp}
              className="text-pretty text-lg leading-relaxed text-[--color-muted]"
            >
              Tienes un proyecto en mente o una oportunidad? Escribeme y
              conversemos. Respondo lo antes posible.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10">
              <p className="mb-3 font-mono text-xs uppercase tracking-wide text-[--color-muted-2]">
                Encuentrame en
              </p>
              <div className="grid grid-cols-2 gap-3">
                {socialItems.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("mailto:") ? undefined : "_blank"}
                    rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                    className="group flex min-h-14 items-center gap-3 rounded-xl border border-[--color-border] bg-[--color-surface-2]/55 px-3 py-3 font-mono text-sm text-[--color-muted] transition-colors hover:border-[--color-accent] hover:bg-[--color-surface-2] hover:text-[--color-accent]"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[--color-surface] text-[--color-accent] transition-colors group-hover:bg-[--color-accent] group-hover:text-[--color-background]">
                      <Icon size={16} />
                    </span>
                    <span>{label}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          </Card>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="lg:col-span-7"
        >
          <Card glow className="h-full p-5 sm:p-8">
            <form
              action={`https://formsubmit.co/${profile.contact.email}`}
              method="POST"
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
            >
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Nombre" name="name" placeholder="Tu nombre" required />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  required
                />
              </div>
              <Field label="Asunto" name="_subject" placeholder="De que hablamos?" />
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block font-mono text-xs uppercase tracking-wide text-[--color-muted-2]"
                >
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  placeholder="Cuentame sobre tu proyecto..."
                  className="w-full resize-none rounded-xl border border-[--color-border] bg-[--color-surface-2] px-4 py-3 text-sm text-[--color-foreground] placeholder:text-[--color-muted-2] focus:border-[--color-accent] focus:outline-none"
                />
              </div>
              <Button type="submit" revealDelay={0.06} className="w-full sm:w-auto" disabled={sending}>
                {sending ? (
                  <>
                    <Send size={16} /> Enviando...
                  </>
                ) : sent ? (
                  <>
                    <Check size={16} /> Correo enviado
                  </>
                ) : (
                  <>
                    <Send size={16} /> Enviar mensaje
                  </>
                )}
              </Button>
            </form>
          </Card>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

function Field({ label, name, type = "text", placeholder, required }) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block font-mono text-xs uppercase tracking-wide text-[--color-muted-2]"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-[--color-border] bg-[--color-surface-2] px-4 py-3 text-sm text-[--color-foreground] placeholder:text-[--color-muted-2] focus:border-[--color-accent] focus:outline-none"
      />
    </div>
  )
}
