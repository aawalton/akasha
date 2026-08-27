import "./public-api"

import { registerAddonInit } from "@temper/shared-build-deploy-addon-bundle-runtime/bundle-runtime"
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
