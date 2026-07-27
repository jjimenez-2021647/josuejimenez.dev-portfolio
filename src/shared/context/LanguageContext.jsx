"use client"

import { createContext, useContext, useMemo, useState } from "react"

const LanguageContext = createContext({ lang: "es", setLang: () => {} })

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("es")
  const value = useMemo(() => ({ lang, setLang }), [lang])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  return useContext(LanguageContext)
}
