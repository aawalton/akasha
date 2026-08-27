import "./public-api"

import "./constants"
import "./companion-core"
import "./rapport"
import "./compass"
import "./saved-variables"
import "./interactions/index"
import "./settings-menu"

import { registerBindingStringIds } from "./bindings"
import { FCOCO } from "./state"
import { registerUiStrings } from "./ui-strings"

registerUiStrings()
registerBindingStringIds()

export function initializeFcoCompanion(): undefined {
  if (FCOCO.isCompanionUnlocked) {
    FCOCO.addonLoaded(FCOCO.addonVars.addonName, FCOCO.addonVars.addonName)
  }
  return undefined
}
