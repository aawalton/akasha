import { langDE, langEN, langES, langFR, langJP, langPL, langRU, langZH } from "./language-codes"
import { checkIfPTSAPIVersionIsLive, lib } from "./shared-text"
import { de } from "./tooltips-de"
import { en } from "./tooltips-en"
import { es } from "./tooltips-es"
import { fr } from "./tooltips-fr"
import { jp } from "./tooltips-jp"
import { pl } from "./tooltips-pl"
import { ru } from "./tooltips-ru"
import { zh } from "./tooltips-zh"

lib.dropMechanicIdToNameTooltip = {
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
