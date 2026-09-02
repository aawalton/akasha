import "./public-api"

import { registerAddonInit } from "@akasha/temper-addon-init/addon-init"
import { ADDON_NAME } from "./constants"
import { registerEvents } from "./events"
import { initializeSavedVariables } from "./saved-variables"
import { registerSlashCommands } from "./slash-commands"

function initialize(this: void): undefined {
  initializeSavedVariables()
  registerEvents()
  registerSlashCommands()
}

registerAddonInit(ADDON_NAME, initialize)
