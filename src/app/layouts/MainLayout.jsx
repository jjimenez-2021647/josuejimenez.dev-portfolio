import { Outlet } from "react-router-dom"
import Navbar from "@/shared/components/layout/Navbar"
import Footer from "@/shared/components/layout/Footer"
import { Starfield } from "@/app/layouts/Starfield"
import ScrollProgress from "@/app/layouts/ScrollProgress"

/** Layout raíz que envuelve todas las páginas del portafolio. */
export default function MainLayout() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <Starfield />
      <div className="relative z-10 animate-foreground">
        <ScrollProgress />
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}
