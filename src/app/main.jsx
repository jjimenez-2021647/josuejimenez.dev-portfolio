import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import { LanguageProvider } from "@/shared/context/LanguageContext"
import "../styles/index.css"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
)
