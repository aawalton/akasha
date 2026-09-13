import { initSavedVariables } from "akasha/temper/crafting-addon/modules/writ-saved-variables/writ-saved-variables.module.code.ts"
import { createSettingsWindow } from "akasha/temper/crafting-addon/modules/writ-settings-window/writ-settings-window.module.code.ts"
import { registerSlashCommands } from "akasha/temper/crafting-addon/modules/writ-slash-commands/writ-slash-commands.module.code.ts"
import { smithingInit } from "akasha/temper/crafting-addon/modules/writ-smith-schema/writ-smith-schema.module.code.ts"
import { tooltipInterceptInstall } from "akasha/temper/crafting-addon/modules/writ-tooltip/writ-tooltip.module.code.ts"
import "akasha/temper/crafting-addon/modules/writ-parser-dispatch/writ-parser-dispatch.module.code.ts"
import "akasha/temper/crafting-addon/modules/writ-public-api/writ-public-api.module.code.ts"

ZO_CreateStringId("SI_KEYBINDINGS_CATEGORY_WRIT_WORTHY", "TemperWrit")

export function initializeTemperWrit(): undefined {
  initSavedVariables()

  registerSlashCommands()
  smithingInit()

  tooltipInterceptInstall()
  createSettingsWindow()
}
