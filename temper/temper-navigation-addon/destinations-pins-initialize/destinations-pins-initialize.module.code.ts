import "../destinations-pins-slash-commands/destinations-pins-slash-commands.module.code.ts"
import { registerSettingsStrings } from "../destinations-lang-strings/destinations-lang-strings.module.code.ts"
import { ADDON_NAME } from "../destinations-names/destinations-names.module.code.ts"
import {
  initializePinTextColorCollectibleDefs,
  initializePinTextColorDefs,
  initializePinTextColorFishingDefs,
  initializePinTintColorDefs,
} from "../destinations-pins-color-defs/destinations-pins-color-defs.module.code.ts"
import {
  onAchievementUpdate,
  onPoiUpdated,
} from "../destinations-pins-events/destinations-pins-events.module.code.ts"
import { updateCompassFilters } from "../destinations-pins-filters/destinations-pins-filters.module.code.ts"
import {
  hookKeepTooltips,
  hookPoiTooltips,
} from "../destinations-pins-hooks/destinations-pins-hooks.module.code.ts"
import { initVariables } from "../destinations-pins-init-variables/destinations-pins-init-variables.module.code.ts"
import {
  disableEnglishFunctionnalities,
  showLanguageWarning,
  supported_menu_lang,
} from "../destinations-pins-language/destinations-pins-language.module.code.ts"
import { setPinLayouts } from "../destinations-pins-layouts-applied/destinations-pins-layouts-applied.module.code.ts"
import { redrawQolPins } from "../destinations-pins-qol-pins/destinations-pins-qol-pins.module.code.ts"
import { initializeSetDescription } from "../destinations-pins-sets/destinations-pins-sets.module.code.ts"
import { onGamepadPreferredModeChanged } from "../destinations-pins-tooltips/destinations-pins-tooltips.module.code.ts"
import {
  initializeSavedVariables,
  markSavedVarsInitialized,
} from "../destinations-saved-variables/destinations-saved-variables.module.code.ts"
import { initSettings as InitSettings } from "../destinations-settings-init/destinations-settings-init.module.code.ts"

export function initializeDestinations(): undefined {
  registerSettingsStrings()

  initializeSavedVariables()

  disableEnglishFunctionnalities()

  initializePinTextColorDefs()
  initializePinTintColorDefs()
  initializePinTextColorCollectibleDefs()
  initializePinTextColorFishingDefs()

  markSavedVarsInitialized()

  redrawQolPins()

  if (!supported_menu_lang) {
    EVENT_MANAGER.RegisterForEvent(ADDON_NAME, EVENT_PLAYER_ACTIVATED, showLanguageWarning)
  }

  initVariables()

  onGamepadPreferredModeChanged()

  hookPoiTooltips()
  hookKeepTooltips()

  setPinLayouts()

  updateCompassFilters()

  InitSettings()

  initializeSetDescription()

  EVENT_MANAGER.RegisterForEvent(ADDON_NAME, EVENT_POI_UPDATED, function (this: void): undefined {
    onPoiUpdated()
  })
  EVENT_MANAGER.RegisterForEvent(ADDON_NAME, EVENT_ACHIEVEMENT_UPDATED, onAchievementUpdate)
  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME,
    EVENT_GAMEPAD_PREFERRED_MODE_CHANGED,
    onGamepadPreferredModeChanged
  )
}
