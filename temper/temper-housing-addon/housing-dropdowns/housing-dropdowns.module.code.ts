import "@akasha/temper-eso-types/eso-globals"
import "@akasha/temper-eso-types/eso-ui"
import "@akasha/temper-eso-types/eso-ui-2"
import "@akasha/temper-eso-types/eso-ui-3"
import "@akasha/temper-eso-types/tstl-eso-sandbox"
import { portToFriend } from "../housing-state/housing-state.module.code.ts"

interface ComboBoxView {
  SetSortsItems: (this: ComboBoxView, sortsItems: boolean) => void
  ClearItems: (this: ComboBoxView) => void
  CreateItemEntry: (this: ComboBoxView, name: string, callback: unknown) => ComboBoxEntry
  AddItem: (this: ComboBoxView, entry: ComboBoxEntry, suppressUpdate: unknown) => void
}
function asComboBoxView(value: unknown): ComboBoxView {
  return value as ComboBoxView
}

interface ComboBoxEntry {
  name: string
  filterId?: number
  sortId?: number
}

interface SliderView {
  SetValue: (this: SliderView, value: number) => void
}
function asSliderView(value: unknown): SliderView {
  return value as SliderView
}

interface SliderHost {
  slider: unknown
}
function asSliderHost(value: unknown): SliderHost {
  return value as SliderHost
}

type StringSeq = string[]
function asStringSeq(value: unknown): StringSeq {
  return value as StringSeq
}

type RecordKey = number | string
function asRecordKey(value: unknown): RecordKey {
  return value as RecordKey
}

type HousesRecord = Record<number, string>
function asHousesRecord(value: unknown): HousesRecord {
  return value as HousesRecord
}

function dropdownCallback(
  this: void,
  _control: Control,
  text: string,
  _choice: unknown
): undefined {
  portToFriend.addonState.houseId = portToFriend.GetIdFromName(text)
  if (portToFriend.config.houseDebug === true) {
    d(portToFriend.addonState.houseId)
  }
}
portToFriend.DropdownCallback = dropdownCallback

function categoryDropdownCallback(
  this: void,
  _control: Control,
  _text: string,
  choice: { filterId: number }
): undefined {
  portToFriend.addonState.selectedLibraryFilter = choice.filterId
  if (portToFriend.savedVars !== undefined) {
    portToFriend.savedVars.selectedLibraryFilter = choice.filterId
  }
  if (portToFriend.addonState.categoryFilterInitialized === true) {
    portToFriend.UpdateLibraryEntries()
  }
}
portToFriend.CategoryDropdownCallback = categoryDropdownCallback

function librarySortDropdownCallback(
  this: void,
  _control: Control,
  _text: string,
  choice: { filterId: number }
): undefined {
  portToFriend.addonState.selectedLibrarySort = choice.filterId
  if (portToFriend.savedVars !== undefined) {
    portToFriend.savedVars.selectedLibrarySort = choice.filterId
  }
  if (portToFriend.addonState.LibrarySortInitialized === true) {
    portToFriend.UpdateLibraryEntries()
  }
}
portToFriend.LibrarySortDropdownCallback = librarySortDropdownCallback

function updateLibraryEntries(this: void): undefined {
  const librarySlider = asSliderView(asSliderHost(portToFriend.controls.library).slider)
  librarySlider.SetValue(0)
  const entries = portToFriend.GetFilteredLibraryData()
  if (entries !== undefined) {
    for (let i = 0; i < portToFriend.controls.libraryEntries.length; i = i + 1) {
      portToFriend.ClearLibraryControls(i)
    }
    portToFriend.CreateLibraryEntries()
  }
}
portToFriend.UpdateLibraryEntries = updateLibraryEntries

function cloneTable(
  this: void,
  origTable: Record<number | string, unknown>
): Record<number | string, unknown> {
  const newTable: Record<number | string, unknown> = {}
  for (const [key, value] of pairs(origTable)) {
    newTable[asRecordKey(key)] = value
  }
  return newTable
}
portToFriend.CloneTable = cloneTable

function sortHouseList(this: void, names: Record<number, string>): string[] | undefined {
  return portToFriend.SortPairs(names)
}
portToFriend.SortHouseList = sortHouseList

function createSortedHouseList(this: void): string[] | undefined {
  const retVal = asHousesRecord(portToFriend.CloneTable(portToFriend.HOUSES))
  return portToFriend.SortHouseList(retVal)
}
portToFriend.CreateSortedHouseList = createSortedHouseList

function createCategoryFilterList(this: void): Record<number, string> {
  const c = portToFriend.constants
  const retVal: Record<number, string> = {}
  retVal[c.FILTER_ID_NONE] = c.FILTER_NONE ?? ""
  retVal[c.FILTER_ID_HIGHLIGHT] = c.FILTER_HIGHLIGHT ?? ""
  retVal[c.FILTER_ID_LABYRINTH] = c.FILTER_LABYRINTH ?? ""
  retVal[c.FILTER_ID_JUMPNRUN] = c.FILTER_JUMPNRUN ?? ""
  retVal[c.FILTER_ID_CRAFTING] = c.FILTER_CRAFTING ?? ""
  retVal[c.FILTER_ID_GUILD] = c.FILTER_GUILD ?? ""
  retVal[c.FILTER_ID_ROLEPLAY] = c.FILTER_ROLEPLAY ?? ""
  retVal[c.FILTER_ID_RAID] = c.FILTER_RAID ?? ""
  retVal[c.FILTER_ID_HIDE_SEEK] = c.FILTER_HIDE_SEEK ?? ""
  retVal[c.FILTER_ID_ERP] = c.FILTER_ERP ?? ""
  return retVal
}
portToFriend.CreateCategoryFilterList = createCategoryFilterList

function createLibrarySortFilterList(this: void): Record<number, string> {
  const c = portToFriend.constants
  const retVal: Record<number, string> = {}
  retVal[c.LIBRARY_SORT_ID_NONE] = c.LIBRARY_SORT_NONE ?? ""
  retVal[c.LIBRARY_SORT_ID_NAME] = c.LIBRARY_SORT_NAME ?? ""
  retVal[c.LIBRARY_SORT_ID_HOUSE] = c.LIBRARY_SORT_HOUSE ?? ""
  return retVal
}
portToFriend.CreateLibrarySortFilterList = createLibrarySortFilterList

function createDropdownEntries(this: void, dropdown: unknown): undefined {
  const combo = asComboBoxView(dropdown)
  combo.SetSortsItems(false)
  combo.ClearItems()
  const sortedHouses = portToFriend.CreateSortedHouseList()
  if (sortedHouses !== undefined) {
    for (let i = 0; i < sortedHouses.length; i = i + 1) {
      const name = sortedHouses[i]
      if (name !== undefined) {
        const entry = combo.CreateItemEntry(name, portToFriend.DropdownCallback)
        combo.AddItem(entry, ZO_COMBOBOX_SUPRESS_UPDATE)
      }
    }
  }
}
portToFriend.CreateDropdownEntries = createDropdownEntries

function createCategoryDropdownEntries(this: void, dropdown: unknown): undefined {
  const combo = asComboBoxView(dropdown)
  combo.SetSortsItems(false)
  combo.ClearItems()
  const entries = asStringSeq(portToFriend.CreateCategoryFilterList())
  for (let i = 0; i < entries.length; i = i + 1) {
    const label = entries[i]
    if (label === undefined) {
      continue
    }
    const entry = combo.CreateItemEntry(label, portToFriend.CategoryDropdownCallback)
    entry.filterId = i + 1
    combo.AddItem(entry, ZO_COMBOBOX_SUPRESS_UPDATE)
  }
}
portToFriend.CreateCategoryDropdownEntries = createCategoryDropdownEntries

function createLibrarySortDropdownEntries(this: void, dropdown: unknown): undefined {
  const combo = asComboBoxView(dropdown)
  combo.SetSortsItems(false)
  combo.ClearItems()
  const entries = asStringSeq(portToFriend.CreateLibrarySortFilterList())
  for (let i = 0; i < entries.length; i = i + 1) {
    const label = entries[i]
    if (label === undefined) {
      continue
    }
    const entry = combo.CreateItemEntry(label, portToFriend.LibrarySortDropdownCallback)
    entry.filterId = i + 1
    combo.AddItem(entry, ZO_COMBOBOX_SUPRESS_UPDATE)
  }
}
portToFriend.CreateLibrarySortDropdownEntries = createLibrarySortDropdownEntries

function sortDropdownCallback(
  this: void,
  _control: Control,
  _text: string,
  choice: { sortId: number }
): undefined {
  portToFriend.addonState.selectedMyHousesSort = choice.sortId
  if (portToFriend.savedVars !== undefined) {
    portToFriend.savedVars.selectedMyHousesSort = choice.sortId
  }
  if (portToFriend.addonState.sortInitialized === true) {
    const myHousesSlider = asSliderView(asSliderHost(portToFriend.controls.myHouses).slider)
    myHousesSlider.SetValue(1)
    portToFriend.UpdateMyHouses()
  }
}
portToFriend.SortDropdownCallback = sortDropdownCallback

function createSortDropdownEntries(this: void, dropdown: unknown): undefined {
  const combo = asComboBoxView(dropdown)
  combo.SetSortsItems(false)
  combo.ClearItems()
  const c = portToFriend.constants
  const entriesRec: Record<number, string> = {}
  entriesRec[c.SORT_ID_HOUSE] = c.SORT_HOUSE ?? ""
  entriesRec[c.SORT_ID_LOCATION] = c.SORT_LOCATION ?? ""
  const entries = asStringSeq(entriesRec)
  for (let i = 0; i < entries.length; i = i + 1) {
    const label = entries[i]
    if (label === undefined) {
      continue
    }
    const entry = combo.CreateItemEntry(label, portToFriend.SortDropdownCallback)
    entry.sortId = i + 1
    combo.AddItem(entry, ZO_COMBOBOX_SUPRESS_UPDATE)
  }
}
portToFriend.CreateSortDropdownEntries = createSortDropdownEntries
