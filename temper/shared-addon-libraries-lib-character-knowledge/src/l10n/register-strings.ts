import { LCCC } from "../lccc"
import { defaults } from "./strings-default"
import { es } from "./strings-es"
import { fr } from "./strings-fr"
import { ru } from "./strings-ru"
import { zh } from "./strings-zh"

const byLang: Record<string, ReadonlyArray<[string, string]>> = {
  es,
  fr,
  ru,
  zh,
}

for (const [id, text] of defaults) {
  LCCC.RegisterString(id, text)
}
const lang = GetCVar("Language.2")
const overrides = byLang[lang]
if (overrides !== undefined) {
  for (const [id, text] of overrides) {
    LCCC.RegisterString(id, text)
  }
}
