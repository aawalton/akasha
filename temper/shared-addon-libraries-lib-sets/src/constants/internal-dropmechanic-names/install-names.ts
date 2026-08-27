import { langDE, langEN, langES, langFR, langJP, langPL, langRU, langZH } from "./language-codes"
import { de } from "./names-de"
import { en } from "./names-en"
import { es } from "./names-es"
import { fr } from "./names-fr"
import { jp } from "./names-jp"
import { pl } from "./names-pl"
import { ru } from "./names-ru"
import { zh } from "./names-zh"
import { checkIfPTSAPIVersionIsLive, lib } from "./shared-text"

lib.dropMechanicIdToName = {
  [langDE]: de,
  [langEN]: en,
  [langES]: es,
  [langFR]: fr,
  [langPL]: pl,
  [langRU]: ru,
  [langJP]: jp,
  [langZH]: zh,
}
if (checkIfPTSAPIVersionIsLive()) {
}
