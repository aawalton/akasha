import { DEFAULTS, getSavedVariables } from "../saved-variables"

export function addPinMenuOptions(this: void, optionsTable: unknown[]): undefined {
  optionsTable[optionsTable.length] = {
    type: "checkbox",
    name: GetString(LBOOKS_DUNGEON_TAG_MENU),
    tooltip: GetString(LBOOKS_DUNGEON_TAG_MENU_DESC),
    getFunc: (): boolean => getSavedVariables().showDungeonTag,
    setFunc: (state: boolean): undefined => {
      getSavedVariables().showDungeonTag = state
    },
    default: DEFAULTS.showDungeonTag,
  } satisfies LamCheckboxData
  optionsTable[optionsTable.length] = {
    type: "checkbox",
    name: GetString(LBOOKS_QUESTINFO_MENU),
    tooltip: GetString(LBOOKS_QUESTINFO_MENU_DESC),
    getFunc: (): boolean => getSavedVariables().showQuestName,
    setFunc: (state: boolean): undefined => {
      getSavedVariables().showQuestName = state
    },
    default: DEFAULTS.showQuestName,
  } satisfies LamCheckboxData
  optionsTable[optionsTable.length] = {
    type: "checkbox",
    name: GetString(LBOOKS_PIN_CLICK_MENU),
    tooltip: GetString(LBOOKS_PIN_CLICK_MENU_DESC),
    getFunc: (): boolean => getSavedVariables().showClickMenu,
    setFunc: (state: boolean): undefined => {
      getSavedVariables().showClickMenu = state
    },
    default: DEFAULTS.showClickMenu,
  } satisfies LamCheckboxData
}
