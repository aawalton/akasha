import "./public-api"

import { ADDON_NAME } from "./constants"
import { onAchievementAwarded, onAchievementUpdate } from "./pins"
import { registerPins } from "./register-pins"
import { initializeSavedVariables } from "./saved-variables"
import { createSettingsMenu } from "./settings"
import { registerSlashCommands } from "./slash-commands"

export function initDungeonChampions(this: void): undefined {
  initializeSavedVariables()
  registerPins()
  createSettingsMenu()
  registerSlashCommands()

  EVENT_MANAGER.RegisterForEvent(ADDON_NAME, EVENT_ACHIEVEMENT_UPDATED, onAchievementUpdate)
  EVENT_MANAGER.RegisterForEvent(ADDON_NAME, EVENT_ACHIEVEMENT_AWARDED, onAchievementAwarded)

  return undefined
}
