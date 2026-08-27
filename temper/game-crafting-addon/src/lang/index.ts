import { br } from "./br"
import { de } from "./de"
import { en } from "./en"
import { es } from "./es"
import { fr } from "./fr"
import { it } from "./it"
import type { LangTable } from "./lang-table"
import { ru } from "./ru"
import { zh } from "./zh"


export const Lang = {
  de,
  en,
  fr,
  br,
  ru,
  it,
  es,
  zh,
} satisfies Record<string, LangTable>
