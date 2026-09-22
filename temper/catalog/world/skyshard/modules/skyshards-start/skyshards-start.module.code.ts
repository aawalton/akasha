import { onLoad as consoleOnLoad } from "akasha/temper/catalog/world/skyshard/modules/skyshards-console-load/skyshards-console-load.module.code.ts"
import { showMyPosition as consoleShowMyPosition } from "akasha/temper/catalog/world/skyshard/modules/skyshards-console-slash/skyshards-console-slash.module.code.ts"
import { ADDON_NAME } from "akasha/temper/catalog/world/skyshard/modules/skyshards-constants/skyshards-constants.module.code.ts"
import { onLoad as pcOnLoad } from "akasha/temper/catalog/world/skyshard/modules/skyshards-pc-events/skyshards-pc-events.module.code.ts"
import { registerSlashCommands as registerPcSlashCommands } from "akasha/temper/catalog/world/skyshard/modules/skyshards-pc-slash/skyshards-pc-slash.module.code.ts"
import { registerStrings } from "akasha/temper/catalog/world/skyshard/modules/skyshards-ui-strings/skyshards-ui-strings.module.code.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

export function initSkyShards(this: void): undefined {
  registerStrings()

  if (IsConsoleUI()) {
    SLASH_COMMANDS["/skypos"] = consoleShowMyPosition
    consoleOnLoad(0, ADDON_NAME)
  } else {
    registerPcSlashCommands()
    pcOnLoad(0, ADDON_NAME)
  }

  return undefined
}
