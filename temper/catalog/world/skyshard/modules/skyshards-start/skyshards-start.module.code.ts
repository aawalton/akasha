import { ADDON_NAME } from "akasha/temper/catalog/world/skyshard/modules/skyshards-constants/skyshards-constants.module.code.ts"
import { onLoad as pcOnLoad } from "akasha/temper/catalog/world/skyshard/modules/skyshards-pc-events/skyshards-pc-events.module.code.ts"
import { registerSlashCommands as registerPcSlashCommands } from "akasha/temper/catalog/world/skyshard/modules/skyshards-pc-slash/skyshards-pc-slash.module.code.ts"
import { registerStrings } from "akasha/temper/catalog/world/skyshard/modules/skyshards-ui-strings/skyshards-ui-strings.module.code.ts"

export function initSkyShards(this: void): undefined {
  registerStrings()

  registerPcSlashCommands()
  pcOnLoad(0, ADDON_NAME)

  return undefined
}
