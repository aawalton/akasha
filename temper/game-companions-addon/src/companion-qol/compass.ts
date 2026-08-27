import { FCOCO } from "./state"

FCOCO.UpdateCompass = function (this: void): undefined {
  const settings = FCOCO.settingsVars.settings

  if (settings.disableCompanionAtCompass === true) {
    COMPASS.container.SetAlphaDropoffBehavior(MAP_PIN_TYPE_ACTIVE_COMPANION, 0, 0, 0, 0)
  } else {
    COMPASS.container.SetAlphaDropoffBehavior(MAP_PIN_TYPE_ACTIVE_COMPANION, 1, 1, 1, 1)
  }
  return undefined
}
