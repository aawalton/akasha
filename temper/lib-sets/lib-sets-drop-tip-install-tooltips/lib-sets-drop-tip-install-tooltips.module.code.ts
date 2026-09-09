import {
  LANG_DE,
  LANG_EN,
  LANG_ES,
  LANG_FR,
  LANG_JP,
  LANG_PL,
  LANG_RU,
  LANG_ZH,
} from "../lib-sets-drop-tip-language-codes/lib-sets-drop-tip-language-codes.module.code.ts"
import {
  checkIfPTSAPIVersionIsLive,
  lib,
} from "../lib-sets-drop-tip-shared-text/lib-sets-drop-tip-shared-text.module.code.ts"
import { DE } from "../lib-sets-drop-tip-tooltips-de/lib-sets-drop-tip-tooltips-de.module.code.ts"
import { EN } from "../lib-sets-drop-tip-tooltips-en/lib-sets-drop-tip-tooltips-en.module.code.ts"
import { ES } from "../lib-sets-drop-tip-tooltips-es/lib-sets-drop-tip-tooltips-es.module.code.ts"
import { FR } from "../lib-sets-drop-tip-tooltips-fr/lib-sets-drop-tip-tooltips-fr.module.code.ts"
import { JP } from "../lib-sets-drop-tip-tooltips-jp/lib-sets-drop-tip-tooltips-jp.module.code.ts"
import { PL } from "../lib-sets-drop-tip-tooltips-pl/lib-sets-drop-tip-tooltips-pl.module.code.ts"
import { RU } from "../lib-sets-drop-tip-tooltips-ru/lib-sets-drop-tip-tooltips-ru.module.code.ts"
import { ZH } from "../lib-sets-drop-tip-tooltips-zh/lib-sets-drop-tip-tooltips-zh.module.code.ts"

lib.dropMechanicIdToNameTooltip = {
  [LANG_DE]: DE,
  [LANG_EN]: EN,
  [LANG_ES]: ES,
  [LANG_FR]: FR,
  [LANG_PL]: PL,
  [LANG_RU]: RU,
  [LANG_JP]: JP,
  [LANG_ZH]: ZH,
}
if (checkIfPTSAPIVersionIsLive()) {
}
