import "./slash-commands"
import { ADDON_NAME } from "../constants"
import { registerSettingsStrings } from "../lang/register-strings"
import { initializeSavedVariables, markSavedVarsInitialized } from "../saved-variables"
import { initSettings as InitSettings } from "../settings/init-settings"
import {
  InitializePinTextColorCollectibleDefs,
  InitializePinTextColorDefs,
  InitializePinTextColorFishingDefs,
  InitializePinTintColorDefs,
} from "./color-defs"
import { OnAchievementUpdate, OnPOIUpdated } from "./events"
import { UpdateCompassFilters } from "./filters"
import { HookKeepTooltips, HookPoiTooltips } from "./hooks"
import { InitVariables } from "./init-variables"
import {
  DisableEnglishFunctionnalities,
  ShowLanguageWarning,
  supported_menu_lang,
} from "./language"
import { RedrawQolPins } from "./qol-pins"
import { SetPinLayouts } from "./register-pins"
import { InitializeSetDescription } from "./sets"
import { OnGamepadPreferredModeChanged } from "./tooltips"

export function initializeDestinations(): undefined {
  registerSettingsStrings()

  initializeSavedVariables()

  DisableEnglishFunctionnalities()

  InitializePinTextColorDefs()
  InitializePinTintColorDefs()
  InitializePinTextColorCollectibleDefs()
  InitializePinTextColorFishingDefs()

  markSavedVarsInitialized()

  RedrawQolPins()

  if (!supported_menu_lang) {
    EVENT_MANAGER.RegisterForEvent(ADDON_NAME, EVENT_PLAYER_ACTIVATED, ShowLanguageWarning)
  }

  InitVariables()

  OnGamepadPreferredModeChanged()

  HookPoiTooltips()
  HookKeepTooltips()

  SetPinLayouts()

  UpdateCompassFilters()

  InitSettings()

  InitializeSetDescription()

  EVENT_MANAGER.RegisterForEvent(ADDON_NAME, EVENT_POI_UPDATED, function (this: void): undefined {
    OnPOIUpdated()
  })
  EVENT_MANAGER.RegisterForEvent(ADDON_NAME, EVENT_ACHIEVEMENT_UPDATED, OnAchievementUpdate)
  EVENT_MANAGER.RegisterForEvent(
    ADDON_NAME,
    EVENT_GAMEPAD_PREFERRED_MODE_CHANGED,
    OnGamepadPreferredModeChanged
  )
}
