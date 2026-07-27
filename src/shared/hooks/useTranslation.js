import { useLanguage } from "@/shared/context/LanguageContext"
import { translations } from "@/shared/constants/translations"

export function useTranslation() {
  const { lang } = useLanguage()
  return translations[lang] || translations.es
}
