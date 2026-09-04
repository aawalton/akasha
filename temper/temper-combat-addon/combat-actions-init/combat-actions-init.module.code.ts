import { registerEngineEvents } from "@akasha/temper-combat-addon/combat-action-events"
import { registerViews } from "@akasha/temper-combat-addon/combat-action-views-init"
import { initSavedVariables } from "@akasha/temper-combat-addon/combat-actions-saved-variables"

export function initializeActions(): undefined {
  initSavedVariables()
  registerViews()
  registerEngineEvents()
  return undefined
}
