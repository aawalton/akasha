import "./public-api"

import "./parser-dispatch"

import { initSavedVariables } from "./saved-variables"
import { createSettingsWindow } from "./settings-window"
import { registerSlashCommands } from "./slash-commands"
import { smithingInit } from "./smithing"
import { tooltipInterceptInstall } from "./tooltip"

ZO_CreateStringId("SI_KEYBINDINGS_CATEGORY_WRIT_WORTHY", "TemperWrit")

export function initializeTemperWrit(): undefined {
  initSavedVariables()

  registerSlashCommands()
  smithingInit()

  tooltipInterceptInstall()
  createSettingsWindow()
}
