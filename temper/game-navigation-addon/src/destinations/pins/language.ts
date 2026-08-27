import { ADDON_NAME } from "../constants"
import { getClientLanguage } from "../lang/register-strings"
import { getSavedVariables } from "../saved-variables"

const supported_menu_langs = ["de", "en", "es", "fr", "fx", "jf", "jp", "pl", "ru", "zh"]

function is_in(searchValue: string, searchTable: string[]): boolean {
  if (searchValue === "") return false
  for (const v of searchTable) {
    if (searchValue === v) return true
    const [found] = string.find(string.lower(v), string.lower(searchValue))
    if (found !== undefined) return true
  }
  return false
}

const client_lang: string = getClientLanguage()
const effective_menu_lang: string = is_in(client_lang, supported_menu_langs) ? client_lang : "en"

export const supported_menu_lang: boolean = client_lang === effective_menu_lang

export function ShowLanguageWarning(this: void): undefined {
  EVENT_MANAGER.UnregisterForEvent(ADDON_NAME, EVENT_PLAYER_ACTIVATED)
  if (client_lang === "it") {
    CHAT_ROUTER.AddSystemMessage(
      "Destinations non è localizzato correttamente dalla lingua italiana. Verranno utilizzati termini inglesi e non tutti i punti di interesse potrebbero essere classificati correttamente."
    )
  } else {
    CHAT_ROUTER.AddSystemMessage(
      "Destinations is not properly localized for " +
        client_lang +
        ".  English terms will be used and not all POIs may be properly classified."
    )
  }
}

export function DisableEnglishFunctionnalities(): undefined {
  if (client_lang === "en") {
    const sv = getSavedVariables()
    sv.settings.AddEnglishOnUnknwon = false
    sv.settings.AddEnglishOnKeeps = false
  }
}
