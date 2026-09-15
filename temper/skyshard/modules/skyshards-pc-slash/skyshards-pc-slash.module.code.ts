import { showMyPosition } from "akasha/temper/skyshard/modules/skyshards-console-slash/skyshards-console-slash.module.code.ts"

export function registerSlashCommands(this: void): undefined {
  SLASH_COMMANDS["/skypos"] = showMyPosition
}
