import { COLOR_CHAR_PACK, COLOR_GLOBAL_PACK } from "./constants"
import { deletePack, listPacks, loadPack } from "./packs"
import { getSavedVariables } from "./saved-variables"
import { STRINGS } from "./strings"
import { getControls, setDeleteHandler } from "./ui-layout"

interface DropdownEntry {
  packName: string
  charName: string
  isGlobal: boolean
}

let selectedPackName: string | undefined
let selectedEntry: DropdownEntry | undefined
let entriesByLabel: Record<string, DropdownEntry> = {}
let deleteHandlerRegistered = false

export function getSelectedPackName(): string | undefined {
  return selectedPackName
}

export function refreshPackDropdown(): undefined {
  const ctrls = getControls()
  if (ctrls === undefined) {
    return
  }

  if (!deleteHandlerRegistered) {
    setDeleteHandler(deleteSelectedPack)
    deleteHandlerRegistered = true
  }

  const comboBox = ZO_ComboBox_ObjectFromContainer(ctrls.comboBox)
  comboBox.ClearItems()
  entriesByLabel = {}

  const packs = listPacks()
  for (const pack of packs) {
    const entry: DropdownEntry = {
      packName: pack.name,
      charName: pack.charName,
      isGlobal: pack.isGlobal,
    }
    const label = colorizeLabel(pack.name, pack.isGlobal)
    entriesByLabel[label] = entry
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
  const entry = entriesByLabel[label]
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
