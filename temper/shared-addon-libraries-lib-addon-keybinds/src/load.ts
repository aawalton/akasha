import { CATEGORY_DATA_TYPE, KEYBIND_DATA_TYPE, LAK_NAME } from "./constants"
import { hookKeybindingListCallbacks, hookKeybindingListFilter } from "./list-hooks"
import { addGameMenuEntry } from "./menu-entry"
import type { LakTable } from "./types"
import { ADDON_KEYBINDS, STANDARD_KEYBINDS } from "./ui-strings"

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
