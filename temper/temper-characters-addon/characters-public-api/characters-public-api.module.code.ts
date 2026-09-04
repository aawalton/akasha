import { ADDON_NAME } from "@akasha/temper-player-completion-state/completion-addon-constants"
import { getSavedVariables } from "@akasha/temper-player-completion-state/completion-saved-variables"
import {
  initializeTabs,
  refreshActivePanel,
  registerExternalTab,
  selectSubTab,
  selectTopTab,
} from "../characters-tab-manager/characters-tab-manager.module.code.ts"
import { scheduleTaskAutoCompletionCheck } from "../characters-task-auto-complete/characters-task-auto-complete.module.code.ts"
import {
  hideWindow,
  showWindow,
  toggleWindow,
} from "../characters-window/characters-window.module.code.ts"

const TAB_MANAGER = {
  InitializeTabs: initializeTabs,
  SelectTopTab: selectTopTab,
  SelectSubTab: selectSubTab,
  RefreshActivePanel: refreshActivePanel,
  RegisterExternalTab: registerExternalTab,
}

const PUBLISHED = {
  ADDON_NAME,
  getSavedVariables,
  HideWindow: hideWindow,
  ShowWindow: showWindow,
  ToggleWindow: toggleWindow,
  TabManager: TAB_MANAGER,
  scheduleTaskAutoCompletionCheck,
}

interface CharactersGlobalTable {
  TemperCharacters: typeof PUBLISHED
}

function asGlobalTable(this: void, value: unknown): CharactersGlobalTable {
  return value as CharactersGlobalTable
}

asGlobalTable(globalThis).TemperCharacters = PUBLISHED
