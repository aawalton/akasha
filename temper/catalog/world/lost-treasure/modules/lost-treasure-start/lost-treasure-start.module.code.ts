import "akasha/temper/catalog/world/lost-treasure/modules/lost-treasure-global/lost-treasure-global.module.code.ts"

import { initializeDebug } from "akasha/temper/catalog/world/lost-treasure/modules/lost-treasure-debug/lost-treasure-debug.module.code.ts"
import { initializeItemCache } from "akasha/temper/catalog/world/lost-treasure/modules/lost-treasure-item-cache/lost-treasure-item-cache.module.code.ts"
import { initializeMining } from "akasha/temper/catalog/world/lost-treasure/modules/lost-treasure-mining/lost-treasure-mining.module.code.ts"
import { finalizeInitialization } from "akasha/temper/catalog/world/lost-treasure/modules/lost-treasure-opened-map/lost-treasure-opened-map.module.code.ts"
import { initializePins } from "akasha/temper/catalog/world/lost-treasure/modules/lost-treasure-pins/lost-treasure-pins.module.code.ts"
import { initializeSavedVars } from "akasha/temper/catalog/world/lost-treasure/modules/lost-treasure-saved-vars/lost-treasure-saved-vars.module.code.ts"
import { initializeSettings } from "akasha/temper/catalog/world/lost-treasure/modules/lost-treasure-settings/lost-treasure-settings.module.code.ts"

export function initLostTreasure(this: void): undefined {
  initializeSavedVars()
  initializeItemCache()
  initializeMining()
  initializePins()
  initializeDebug()
  initializeSettings()
  finalizeInitialization()
  return undefined
}
