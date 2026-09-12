import "akasha/temper/selector-addon/selector-public-api/selector-public-api.module.code.ts"

import { registerAddonInit } from "akasha/temper/addon-init/modules/addon-init/addon-init.module.code.ts"
import { ADDON_NAME } from "akasha/temper/selector-addon/selector-constants/selector-constants.module.code.ts"
import { registerEvents } from "akasha/temper/selector-addon/selector-events/selector-events.module.code.ts"
import { initializeSavedVariables } from "akasha/temper/selector-addon/selector-saved-variables/selector-saved-variables.module.code.ts"
import { registerSlashCommands } from "akasha/temper/selector-addon/selector-slash-commands/selector-slash-commands.module.code.ts"

function initialize(this: void): undefined {
  initializeSavedVariables()
  registerEvents()
  registerSlashCommands()
}

registerAddonInit(ADDON_NAME, initialize)
