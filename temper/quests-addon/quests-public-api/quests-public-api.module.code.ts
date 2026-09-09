import "@akasha/temper-addon-library-types/temper-quests-global"

import {
  toggleAutoQuest,
  toggleAutoQuestDebug,
} from "../quests-auto-quest/quests-auto-quest.module.code.ts"

globalThis.TemperQuests = {
  ToggleAutoQuest: toggleAutoQuest,
  ToggleAutoQuestDebug: toggleAutoQuestDebug,
}
