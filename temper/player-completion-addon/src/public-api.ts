import { ADDON_NAME } from "./constants"
import { getSavedVariables } from "./saved-variables"
import { scheduleTaskAutoCompletionCheck } from "./task-auto-complete"
import { TabManager } from "./ui/tab-manager"
import { HideWindow, ToggleWindow } from "./ui/window"

declare global {
  var TemperCharacters: {
    ADDON_NAME: typeof ADDON_NAME
    HideWindow: typeof HideWindow
    TabManager: typeof TabManager
    ToggleWindow: typeof ToggleWindow
    getSavedVariables: typeof getSavedVariables
    scheduleTaskAutoCompletionCheck: typeof scheduleTaskAutoCompletionCheck
  }
}

globalThis.TemperCharacters = {
  ADDON_NAME,
  HideWindow,
  TabManager,
  ToggleWindow,
  getSavedVariables,
  scheduleTaskAutoCompletionCheck,
}
