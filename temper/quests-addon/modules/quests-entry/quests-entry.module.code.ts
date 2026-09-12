import "akasha/temper/quests-addon/modules/quests-public-api/quests-public-api.module.code.ts"

import { registerAddonInit } from "akasha/temper/addon-init/modules/addon-init/addon-init.module.code.ts"
import { registerAutoQuestEvents } from "akasha/temper/quests-addon/modules/quests-auto-quest/quests-auto-quest.module.code.ts"
import { ADDON_NAME } from "akasha/temper/quests-addon/modules/quests-constants/quests-constants.module.code.ts"
import { initializeSavedVariables } from "akasha/temper/quests-addon/modules/quests-saved-variables/quests-saved-variables.module.code.ts"
import { registerSlashCommands } from "akasha/temper/quests-addon/modules/quests-slash-commands/quests-slash-commands.module.code.ts"

function initialize(this: void): undefined {
  initializeSavedVariables()
  registerAutoQuestEvents()
  registerSlashCommands()
}

registerAddonInit(ADDON_NAME, initialize)
