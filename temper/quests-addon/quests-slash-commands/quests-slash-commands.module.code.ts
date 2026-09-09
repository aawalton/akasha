import "../../addon-library-types/temper-hud-global/temper-hud-global.type-declaration.d.ts"

import {
  toggleAutoQuest,
  toggleAutoQuestDebug,
} from "../quests-auto-quest/quests-auto-quest.module.code.ts"

export function registerSlashCommands(): undefined {
  SLASH_COMMANDS["/temperautoquest"] = toggleAutoQuest
  SLASH_COMMANDS["/temperautoquestdebug"] = toggleAutoQuestDebug

  globalThis.TemperHud?.registerCommand({
    name: "/temperautoquest",
    description: "Toggle auto-quest on/off",
    addon: "TemperQuests",
  })
  globalThis.TemperHud?.registerCommand({
    name: "/temperautoquestdebug",
    description: "Toggle auto-quest debug logging",
    addon: "TemperQuests",
  })
}
