import "akasha/temper/navigation-addon/destinations-pins-slash-commands/destinations-pins-slash-commands.module.code.ts"
import { registerSettingsStrings } from "akasha/temper/navigation-addon/destinations-lang-strings/destinations-lang-strings.module.code.ts"
import { ADDON_NAME } from "akasha/temper/navigation-addon/destinations-names/destinations-names.module.code.ts"
import {
  initializePinTextColorCollectibleDefs,
  initializePinTextColorDefs,
  initializePinTextColorFishingDefs,
  initializePinTintColorDefs,
} from "akasha/temper/navigation-addon/destinations-pins-color-defs/destinations-pins-color-defs.module.code.ts"
import {
  onAchievementUpdate,
  onPoiUpdated,
} from "akasha/temper/navigation-addon/destinations-pins-events/destinations-pins-events.module.code.ts"
import { updateCompassFilters } from "akasha/temper/navigation-addon/destinations-pins-filters/destinations-pins-filters.module.code.ts"
import {
  hookKeepTooltips,
  hookPoiTooltips,
} from "akasha/temper/navigation-addon/destinations-pins-hooks/destinations-pins-hooks.module.code.ts"
import { initVariables } from "akasha/temper/navigation-addon/destinations-pins-init-variables/destinations-pins-init-variables.module.code.ts"
import {
  disableEnglishFunctionnalities,
  showLanguageWarning,
  supported_menu_lang,
} from "akasha/temper/navigation-addon/destinations-pins-language/destinations-pins-language.module.code.ts"
import { setPinLayouts } from "akasha/temper/navigation-addon/destinations-pins-layouts-applied/destinations-pins-layouts-applied.module.code.ts"
import { redrawQolPins } from "akasha/temper/navigation-addon/destinations-pins-qol-pins/destinations-pins-qol-pins.module.code.ts"
import { initializeSetDescription } from "akasha/temper/navigation-addon/destinations-pins-sets/destinations-pins-sets.module.code.ts"
import { onGamepadPreferredModeChanged } from "akasha/temper/navigation-addon/destinations-pins-tooltips/destinations-pins-tooltips.module.code.ts"
import {
  initializeSavedVariables,
  markSavedVarsInitialized,
} from "akasha/temper/navigation-addon/destinations-saved-variables/destinations-saved-variables.module.code.ts"
import { initSettings as InitSettings } from "akasha/temper/navigation-addon/destinations-settings-init/destinations-settings-init.module.code.ts"

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
