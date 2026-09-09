import "../lost-treasure-global/lost-treasure-global.module.code.ts"

import { initializeDebug } from "../lost-treasure-debug/lost-treasure-debug.module.code.ts"
import { initializeItemCache } from "../lost-treasure-item-cache/lost-treasure-item-cache.module.code.ts"
import { initializeMining } from "../lost-treasure-mining/lost-treasure-mining.module.code.ts"
import { initializeNotifications } from "../lost-treasure-notifications/lost-treasure-notifications.module.code.ts"
import { finalizeInitialization } from "../lost-treasure-opened-map/lost-treasure-opened-map.module.code.ts"
import { initializePins } from "../lost-treasure-pins/lost-treasure-pins.module.code.ts"
import { initializeSavedVars } from "../lost-treasure-saved-vars/lost-treasure-saved-vars.module.code.ts"
import { initializeSettings } from "../lost-treasure-settings/lost-treasure-settings.module.code.ts"

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
