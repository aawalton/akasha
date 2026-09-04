import "../dungeon-champion-global/dungeon-champion-global.module.code.ts"

import { ADDON_NAME } from "../dungeon-champion-names/dungeon-champion-names.module.code.ts"
import { registerPins } from "../dungeon-champion-pin-register/dungeon-champion-pin-register.module.code.ts"
import {
  onAchievementAwarded,
  onAchievementUpdate,
} from "../dungeon-champion-pins/dungeon-champion-pins.module.code.ts"
import { initializeSavedVariables } from "../dungeon-champion-saved-vars/dungeon-champion-saved-vars.module.code.ts"
import { createSettingsMenu } from "../dungeon-champion-settings/dungeon-champion-settings.module.code.ts"
import { registerSlashCommands } from "../dungeon-champion-slash/dungeon-champion-slash.module.code.ts"

export function initDungeonChampions(this: void): undefined {
  initializeSavedVariables()
  registerPins()
  createSettingsMenu()
  registerSlashCommands()

  EVENT_MANAGER.RegisterForEvent(ADDON_NAME, EVENT_ACHIEVEMENT_UPDATED, onAchievementUpdate)
  EVENT_MANAGER.RegisterForEvent(ADDON_NAME, EVENT_ACHIEVEMENT_AWARDED, onAchievementAwarded)

  return undefined
}
