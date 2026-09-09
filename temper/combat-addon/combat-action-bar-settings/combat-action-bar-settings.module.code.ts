import {
  type BarSettings,
  getSavedVariables,
} from "../combat-actions-saved-variables/combat-actions-saved-variables.module.code.ts"

export function getBarSettings(): BarSettings {
  return getSavedVariables()
}
