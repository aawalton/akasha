import {
  type BarSettings,
  getSavedVariables,
} from "@akasha/temper-combat-addon/combat-actions-saved-variables"

export function getBarSettings(): BarSettings {
  return getSavedVariables()
}
