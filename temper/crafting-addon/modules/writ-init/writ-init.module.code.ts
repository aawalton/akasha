import { initSavedVariables } from "akasha/temper/crafting-addon/writ-saved-variables/writ-saved-variables.module.code.ts"
import { createSettingsWindow } from "akasha/temper/crafting-addon/writ-settings-window/writ-settings-window.module.code.ts"
import { registerSlashCommands } from "akasha/temper/crafting-addon/writ-slash-commands/writ-slash-commands.module.code.ts"
import { smithingInit } from "akasha/temper/crafting-addon/writ-smith-schema/writ-smith-schema.module.code.ts"
import { tooltipInterceptInstall } from "akasha/temper/crafting-addon/writ-tooltip/writ-tooltip.module.code.ts"
import "akasha/temper/crafting-addon/writ-parser-dispatch/writ-parser-dispatch.module.code.ts"
import "akasha/temper/crafting-addon/writ-public-api/writ-public-api.module.code.ts"

ZO_CreateStringId("SI_KEYBINDINGS_CATEGORY_WRIT_WORTHY", "TemperWrit")

export function initializeTemperWrit(): undefined {
  initSavedVariables()

  registerSlashCommands()
  smithingInit()

  tooltipInterceptInstall()
  createSettingsWindow()
}
