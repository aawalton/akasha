import { showMyPosition } from "akasha/temper/catalog/world/skyshard/modules/skyshards-console-slash/skyshards-console-slash.module.code.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

export function registerSlashCommands(this: void): undefined {
  SLASH_COMMANDS["/skypos"] = showMyPosition
}
