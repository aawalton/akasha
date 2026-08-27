import { PIN_TYPES } from "../pin-type-constants"
import { getCharacterSavedVariables, isSavedVarsInitialized } from "../saved-variables"

export function TogglePins(this: void, pinType: string, value: boolean): undefined {
  getCharacterSavedVariables().filters[pinType] = value
  LibMapPins.SetEnabled(pinType, value)
  COMPASS_PINS.SetCompassPinEnabled(pinType, value)
}

export function UpdateCompassFilters(): undefined {
  if (!isSavedVarsInitialized()) return

  const filters = getCharacterSavedVariables().filters
  for (const pinName of Object.values(PIN_TYPES)) {
    const enabled = filters[pinName]
    if (enabled === true) {
      COMPASS_PINS.RefreshPins(pinName)
    }
  }
}
