import "./public-api"

import { registerAddonInit } from "@akasha/temper-addon-init/addon-init"
import { registerAutoQuestEvents } from "./auto-quest/handler"
import { ADDON_NAME } from "./constants"
import { initializeSavedVariables } from "./saved-variables"
import { registerSlashCommands } from "./slash-commands"

function initialize(this: void): undefined {
  initializeSavedVariables()
  registerAutoQuestEvents()
  registerSlashCommands()
}

registerAddonInit(ADDON_NAME, initialize)
