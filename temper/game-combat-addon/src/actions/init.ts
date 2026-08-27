import { registerEngineEvents } from "./engine/events"
import { initSavedVariables } from "./saved-variables"
import { registerViews } from "./views/register"

export function initializeActions(): undefined {
  initSavedVariables()
  registerViews()
  registerEngineEvents()
  return undefined
}
