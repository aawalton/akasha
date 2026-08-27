import { toggleAutoQuest, toggleAutoQuestDebug } from "./auto-quest/handler"

interface TemperQuestsApi {
  ToggleAutoQuest: (this: void) => void
  ToggleAutoQuestDebug: (this: void) => void
}

declare global {
  var TemperQuests: TemperQuestsApi
}

globalThis.TemperQuests = {
  ToggleAutoQuest: toggleAutoQuest,
  ToggleAutoQuestDebug: toggleAutoQuestDebug,
}
