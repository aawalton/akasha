import {
  hookKeybindingListCallbacks,
  hookKeybindingListFilter,
} from "akasha/temper/lib-addon-keybinds/addon-keybinds-list-hooks/addon-keybinds-list-hooks.module.code.ts"
import { addGameMenuEntry } from "akasha/temper/lib-addon-keybinds/addon-keybinds-menu-entry/addon-keybinds-menu-entry.module.code.ts"
import {
  CATEGORY_DATA_TYPE,
  KEYBIND_DATA_TYPE,
  LAK_NAME,
} from "akasha/temper/lib-addon-keybinds/addon-keybinds-names/addon-keybinds-names.module.code.ts"
import {
  ADDON_KEYBINDS,
  STANDARD_KEYBINDS,
} from "akasha/temper/lib-addon-keybinds/addon-keybinds-strings/addon-keybinds-strings.module.code.ts"
import type { LakTable } from "akasha/temper/lib-addon-keybinds/addon-keybinds-types/addon-keybinds-types.module.code.ts"

export function onLoad(
  this: void,
  lak: LakTable,
  keybindingManager: KeybindingManager,
  eventCode: number,
  addonName: string
): undefined {
  if (addonName !== "ZO_Ingame") {
    return undefined
  }
  EVENT_MANAGER.UnregisterForEvent(LAK_NAME, eventCode)

  SafeAddString(SI_GAME_MENU_KEYBINDINGS, STANDARD_KEYBINDS, 1)
  addGameMenuEntry(lak, keybindingManager, ADDON_KEYBINDS)

  hookKeybindingListCallbacks(
    CATEGORY_DATA_TYPE,
    "libAddonKeybinds.SetupCategoryHeader",
    "libAddonKeybinds.HideCategoryHeader"
  )
  hookKeybindingListCallbacks(
    KEYBIND_DATA_TYPE,
    "libAddonKeybinds.SetupKeybindRow",
    "libAddonKeybinds.HideKeybindRow"
  )
  hookKeybindingListFilter(lak, keybindingManager)
  return undefined
}
