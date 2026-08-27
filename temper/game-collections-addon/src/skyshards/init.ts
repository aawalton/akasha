import "./public-api"

import { OnLoad as consoleOnLoad } from "./console/load"
import { ShowMyPosition as consoleShowMyPosition } from "./console/slash"
import { ADDON_NAME } from "./constants"
import { OnLoad as pcOnLoad } from "./pc/events"
import { registerSlashCommands as registerPcSlashCommands } from "./pc/slash"
import { registerStrings } from "./ui-strings"

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
