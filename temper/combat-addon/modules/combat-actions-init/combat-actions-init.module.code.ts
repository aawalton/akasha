import { registerEngineEvents } from "akasha/temper/combat-addon/modules/combat-action-events/combat-action-events.module.code.ts"
import { registerViews } from "akasha/temper/combat-addon/modules/combat-action-views-init/combat-action-views-init.module.code.ts"
import { initSavedVariables } from "akasha/temper/combat-addon/modules/combat-actions-saved-variables/combat-actions-saved-variables.module.code.ts"

export function initializeActions(): undefined {
  initSavedVariables()
  registerViews()
  registerEngineEvents()
  return undefined
}
