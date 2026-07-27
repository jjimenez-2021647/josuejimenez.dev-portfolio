import Hero from "../../features/hero/Hero"
import About from "../../features/about/About"
import Skills from "../../features/skills/Skills"
import Experience from "../../features/experience/Experience"
import Projects from "../../features/projects/Projects"
import Achievements from "../../features/achievements/Achievements"
import Contact from "../../features/contact/Contact"

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Achievements />
      <Contact />
    </>
  )
}
