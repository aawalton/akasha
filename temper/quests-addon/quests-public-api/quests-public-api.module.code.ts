import "akasha/temper/addon-library-types/temper-quests-global/temper-quests-global.type-declaration.d.ts"

import {
  toggleAutoQuest,
  toggleAutoQuestDebug,
} from "akasha/temper/quests-addon/quests-auto-quest/quests-auto-quest.module.code.ts"

globalThis.TemperQuests = {
  ToggleAutoQuest: toggleAutoQuest,
  ToggleAutoQuestDebug: toggleAutoQuestDebug,
}
