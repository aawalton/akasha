import { listAddons } from "./addon-manager"
import { GLOBAL_PACK_NAME } from "./constants"
import { isPackActive } from "./packs-core"
import { getCurrentCharId, getCurrentSelectedPack, getSavedVariables } from "./saved-variables"
import { STRINGS } from "./strings"
import type { Pack } from "./types"
import { getControls } from "./ui-layout"

let lastSearchTerm = ""
let lastMatchOrdinal = -1

export function startAddonSearch(): undefined {
  lastSearchTerm = ""
  lastMatchOrdinal = -1
  const controls = getControls()
  if (controls !== undefined) {
    controls.searchBox.SetText("")
    controls.searchBox.TakeFocus()
  }
  d(STRINGS.searchInstructions)
}

export function searchAddon(text: string): undefined {
  if (text === "") {
    lastSearchTerm = ""
    lastMatchOrdinal = -1
    return
  }
  const needle = text.toLowerCase()
  if (needle !== lastSearchTerm) {
    lastSearchTerm = needle
    lastMatchOrdinal = -1
  }

  const listData = ZO_ScrollList_GetDataList(ZO_AddOnsList)
  if (listData === undefined) {
    return
  }

  const matchSortIndexes: number[] = []
  for (const entry of listData) {
    const data = entry.data
    if (data === undefined || data.sortIndex === undefined) {
      continue
    }
    if (rowMatches(data, needle)) {
      matchSortIndexes.push(data.sortIndex)
    }
  }
  if (matchSortIndexes.length === 0) {
    return
  }

  const nextOrdinal = (lastMatchOrdinal + 1) % matchSortIndexes.length
  lastMatchOrdinal = nextOrdinal
  const targetSortIndex = matchSortIndexes[nextOrdinal]
  if (targetSortIndex === undefined) {
    return
  }
  scrollToSortIndex(targetSortIndex)
}

function rowMatches(data: ZoAddOnRowData, needle: string): boolean {
  const fields = [data.addOnName, data.strippedAddOnName, data.addOnFileName]
  for (const field of fields) {
    if (field?.toLowerCase().includes(needle) === true) {
      return true
    }
  }
  return false
}

function scrollToSortIndex(sortIndex: number): undefined {
  const manager = ADD_ON_MANAGER_KEYBOARD
  if (manager === undefined || manager.list === undefined) {
    return
  }
  ZO_ScrollList_ScrollDataIntoView(manager.list, sortIndex, undefined, false)
}

export function showActivePackInChat(): undefined {
  const ref = getCurrentSelectedPack()
  if (ref === undefined || ref.packName === "") {
    d(STRINGS.noActivePack)
    return
  }
  const pack = lookupSelectedPack(ref.packName, ref.charName)
  if (pack === undefined || !isPackActive(pack, listAddons())) {
    d(STRINGS.noActivePack)
    return
  }
  d(formatActivePack(ref.packName))
}

function lookupSelectedPack(packName: string, charName: string): Pack | undefined {
  const sv = getSavedVariables()
  if (charName !== "" && charName !== GLOBAL_PACK_NAME) {
    const charStore = sv.addonPacksOfChar[getCurrentCharId()]
    if (charStore !== undefined && charStore[packName] !== undefined) {
      return charStore[packName]
    }
  }
  return sv.addonPacks[packName]
}

function formatActivePack(packName: string): string {
  return STRINGS.activePackTemplate.replace("%s", packName)
}
