import {
  COLOR_CHAR_PACK,
  COLOR_GLOBAL_PACK,
} from "../selector-constants/selector-constants.module.code.ts"
import { deletePack, listPacks, loadPack } from "../selector-packs/selector-packs.module.code.ts"
import { getSavedVariables } from "../selector-saved-variables/selector-saved-variables.module.code.ts"
import { STRINGS } from "../selector-strings/selector-strings.module.code.ts"
import {
  getControls,
  setDeleteHandler,
} from "../selector-ui-layout/selector-ui-layout.module.code.ts"

interface DropdownEntry {
  packName: string
  charName: string
  isGlobal: boolean
}

let selectedPackName: string | undefined
let selectedEntry: DropdownEntry | undefined
const ENTRIES_BY_LABEL = new Map<string, DropdownEntry>()

export function getSelectedPackName(): string | undefined {
  return selectedPackName
}

export function refreshPackDropdown(): undefined {
  const ctrls = getControls()
  if (ctrls === undefined) {
    return
  }

  const comboBox = ZO_ComboBox_ObjectFromContainer(ctrls.comboBox)
  comboBox.ClearItems()
  ENTRIES_BY_LABEL.clear()

  const packs = listPacks()
  for (const pack of packs) {
    const entry: DropdownEntry = {
      packName: pack.name,
      charName: pack.charName,
      isGlobal: pack.isGlobal,
    }
    const label = colorizeLabel(pack.name, pack.isGlobal)
    ENTRIES_BY_LABEL.set(label, entry)
    const item = comboBox.CreateItemEntry(label, function (this: void): undefined {
      onEntrySelected(label)
    })
    comboBox.AddItem(item)
  }
}

function colorizeLabel(packName: string, isGlobal: boolean): string {
  const hex = isGlobal === true ? COLOR_GLOBAL_PACK : COLOR_CHAR_PACK
  return `|c${hex}${packName}|r`
}

function onEntrySelected(label: string): undefined {
  const entry = ENTRIES_BY_LABEL.get(label)
  if (entry === undefined) {
    return
  }
  selectedEntry = entry
  selectedPackName = entry.packName

  loadPack(entry.packName, entry.charName)

  if (getSavedVariables().autoReloadUI !== true) {
    const ctrls = getControls()
    if (ctrls !== undefined) {
      const charLabel = entry.isGlobal === true ? STRINGS.packGlobal : entry.charName
      ctrls.selectedPackLabel.SetText(
        zo_strformat(STRINGS.selectedPackName, charLabel) + entry.packName
      )
    }
  }
}

function deleteSelectedPack(this: void): undefined {
  if (selectedEntry === undefined) {
    return
  }
  deletePack(selectedEntry.packName, selectedEntry.charName)
  selectedEntry = undefined
  selectedPackName = undefined
  refreshPackDropdown()
}

setDeleteHandler(deleteSelectedPack)
