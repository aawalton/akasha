import {
  DEFAULTS,
  getSavedVariables,
} from "akasha/temper/catalog/world/lorebook/modules/lorebooks-saved-variables/lorebooks-saved-variables.module.code.ts"
import "akasha/temper/addon/type/temper-addon-menu-global/temper-addon-menu-global.type-declaration.d.ts"
import "akasha/temper/catalog/world/lorebook/lorebooks-string-ids/lorebooks-string-ids.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"

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
