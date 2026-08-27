import { MAX_ADDON_LOAD_PACK_KEYBINDS } from "./constants"
import { getSavedVariables } from "./saved-variables"
import { STRINGS } from "./strings"
import { getSelectedPackName, refreshPackDropdown } from "./ui-dropdown"
import { setSettingsHandler } from "./ui-layout"

type ToggleKey =
  | "showGlobalPacks"
  | "showGroupedByCharacterName"
  | "saveGroupedByCharacterName"
  | "autoReloadUI"

export function showSettingsMenu(owner: object): undefined {
  ClearMenu()

  addToggle(STRINGS.showGlobalPacks, "showGlobalPacks")
  addToggle(STRINGS.showGroupedByCharacterName, "showGroupedByCharacterName")
  addToggle(STRINGS.saveGroupedByCharacterName, "saveGroupedByCharacterName")
  addToggle(STRINGS.autoReloadUIHint, "autoReloadUI")

  addKeybindEntries()

  ShowMenu(owner)
}

setSettingsHandler(showSettingsMenu)

function addToggle(label: string, key: ToggleKey): undefined {
  const sv = getSavedVariables()
  const checked = sv[key] === true
  const prefix = checked ? "[x] " : "[  ] "
  AddCustomMenuItem(
    prefix + label,
    function (this: void): undefined {
      const vars = getSavedVariables()
      vars[key] = vars[key] !== true
      if (key === "saveGroupedByCharacterName" && vars.saveGroupedByCharacterName === true) {
        vars.showGroupedByCharacterName = true
      }
      refreshPackDropdown()
    },
    MENU_ADD_OPTION_CHECKBOX
  )
}

function addKeybindEntries(): undefined {
  const selectedPack = getSelectedPackName()
  for (let slot = 1; slot <= MAX_ADDON_LOAD_PACK_KEYBINDS; slot += 1) {
    if (selectedPack !== undefined && selectedPack !== "") {
      const assignLabel = zo_strformat(STRINGS.addPackToKeybind, slot)
      AddCustomMenuItem(
        assignLabel,
        function (this: void): undefined {
          assignKeybind(slot, selectedPack)
        },
        MENU_ADD_OPTION_LABEL
      )
    }
    const removeLabel = zo_strformat(STRINGS.removePackFromKeybind, slot)
    AddCustomMenuItem(
      removeLabel,
      function (this: void): undefined {
        removeKeybind(slot)
      },
      MENU_ADD_OPTION_LABEL
    )
  }
}

function assignKeybind(slot: number, packName: string): undefined {
  const sv = getSavedVariables()
  const ref = sv.selectedPackNameForCharacters
  const charEntry = ref[currentCharKey(sv)]
  const charName = charEntry !== undefined ? charEntry.charName : ""
  globalThis.TemperAddons.assignPackToKeybind(slot, packName, charName)
}

function removeKeybind(slot: number): undefined {
  globalThis.TemperAddons.removePackFromKeybind(slot)
}

function currentCharKey(sv: ReturnType<typeof getSavedVariables>): string {
  let bestKey = ""
  let bestTs = -1
  for (const key in sv.selectedPackNameForCharacters) {
    const entry = sv.selectedPackNameForCharacters[key]
    if (entry !== undefined && entry.timestamp > bestTs) {
      bestTs = entry.timestamp
      bestKey = key
    }
  }
  return bestKey
}
