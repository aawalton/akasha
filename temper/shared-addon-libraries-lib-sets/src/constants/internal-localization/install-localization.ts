import { asPresent } from "../../casts"
import { fallbackLang, lib } from "./game-strings"
import { langDE, langEN } from "./language-codes"
import { booleanToOnOff } from "./on-off-labels"
import { de } from "./strings-de"
import { en } from "./strings-en"

lib.localization = {
  [langDE]: de,
  [langEN]: en,
}

asPresent(lib.localization[fallbackLang]).booleanToOnOff = booleanToOnOff
