import { type BarSettings, getSavedVariables } from "../saved-variables"


export function getBarSettings(): BarSettings {
  return getSavedVariables()
}
