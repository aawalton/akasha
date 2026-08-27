import "./public-api"

import { initializeDebug } from "./debug"
import { initializeItemCache } from "./item-cache"
import { finalizeInitialization } from "./lost-treasure"
import { initializeMining } from "./mining"
import { initializeNotifications } from "./notifications"
import { initializePins } from "./pins"
import { initializeSavedVars } from "./saved-variables"
import { initializeSettings } from "./settings"

export function initLostTreasure(this: void): undefined {
  initializeSavedVars()
  initializeItemCache()
  initializeNotifications()
  initializeMining()
  initializePins()
  initializeDebug()
  initializeSettings()
  finalizeInitialization()
  return undefined
}
