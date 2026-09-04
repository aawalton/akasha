import {
  DEFAULTS,
  getSavedVariables,
} from "../lorebooks-saved-variables/lorebooks-saved-variables.module.code.ts"

export function addPinMenuOptions(this: void, optionsTable: unknown[]): undefined {
  optionsTable[optionsTable.length] = {
    type: "checkbox",
    name: GetString(LBOOKS_DUNGEON_TAG_MENU),
    tooltip: GetString(LBOOKS_DUNGEON_TAG_MENU_DESC),
    getFunc: (): boolean => getSavedVariables().showDungeonTag,
    setFunc: (shown: boolean): undefined => {
      getSavedVariables().showDungeonTag = shown
    },
    default: DEFAULTS.showDungeonTag,
  } satisfies LamCheckboxData
  optionsTable[optionsTable.length] = {
    type: "checkbox",
    name: GetString(LBOOKS_QUESTINFO_MENU),
    tooltip: GetString(LBOOKS_QUESTINFO_MENU_DESC),
    getFunc: (): boolean => getSavedVariables().showQuestName,
    setFunc: (shown: boolean): undefined => {
      getSavedVariables().showQuestName = shown
    },
    default: DEFAULTS.showQuestName,
  } satisfies LamCheckboxData
  optionsTable[optionsTable.length] = {
    type: "checkbox",
    name: GetString(LBOOKS_PIN_CLICK_MENU),
    tooltip: GetString(LBOOKS_PIN_CLICK_MENU_DESC),
    getFunc: (): boolean => getSavedVariables().showClickMenu,
    setFunc: (shown: boolean): undefined => {
      getSavedVariables().showClickMenu = shown
    },
    default: DEFAULTS.showClickMenu,
  } satisfies LamCheckboxData
}
