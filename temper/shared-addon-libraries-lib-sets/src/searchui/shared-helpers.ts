import { asNumber, asPresent, asString, asStrRecord } from "../casts"
import {
  asSearchHistoryStringMap,
  asSearchHistoryUnknownMap,
  asSearchHistoryUnknownMapPresent,
  asSetInfoMap,
  asStringOptArray,
} from "./casts"

const lib = LibSets

const EM = EVENT_MANAGER

const tsort = table.sort
const strlow = string.lower
const zoite = ZO_IsTableEmpty

const libSets_GetSetInfo = lib.GetSetInfo

import { searchHistoryEventUpdaterName } from "./shared-state"

let wasSetsDataScannedAndAdded = false

function scanAndAddDataToSetsMasterListBase(
  this: void,
  defaultMasterListBase: { [setId: number]: { [key: string]: unknown } },
  p_setId: number | undefined,
  p_setData: { [key: string]: unknown } | undefined
): { [setId: number]: { [key: string]: unknown } } | { [key: string]: unknown } {
  if (p_setId !== undefined && p_setData !== undefined) {
    let setData = p_setData
    setData.setId = setData.setId ?? p_setId
    if (
      setData[asPresent(LIBSETS_TABLEKEY_DROPMECHANIC_NAMES)] === undefined ||
      setData[asPresent(LIBSETS_TABLEKEY_DROPMECHANIC_LOCATION_NAMES)] === undefined
    ) {
      setData = asStrRecord(libSets_GetSetInfo(p_setId, false, undefined))
    }
    return setData
  }
  for (const [setId, setDataIter] of pairs(defaultMasterListBase)) {
    let setData = setDataIter
    setData.setId = setData.setId ?? setId
    if (
      setData[asPresent(LIBSETS_TABLEKEY_DROPMECHANIC_NAMES)] === undefined ||
      setData[asPresent(LIBSETS_TABLEKEY_DROPMECHANIC_LOCATION_NAMES)] === undefined
    ) {
      setData = asStrRecord(libSets_GetSetInfo(setId, false, undefined))
      defaultMasterListBase[setId] = setData
    }
  }
  wasSetsDataScannedAndAdded = true
  return defaultMasterListBase
}

export function updateSetsInfoWithDataAndNames(
  this: void,
  selfVar: LibSetsSearchUISharedObject
): undefined {
  if (!wasSetsDataScannedAndAdded) {
    const setsData = lib.setInfo
    const setsDataNew = asSetInfoMap(
      scanAndAddDataToSetsMasterListBase(setsData, undefined, undefined)
    )
    lib.setInfo = setsDataNew

    selfVar.resultsList.RefreshData()
  }
}

export function clearSearchHistory(this: void, searchType: string): undefined {
  const settings = asPresent(lib.svData)
  const searchHistory = asSearchHistoryUnknownMap(settings.setSearchHistory)
  if (zoite(searchHistory[searchType])) {
    return
  }
  asSearchHistoryUnknownMapPresent(asPresent(lib.svData).setSearchHistory)[searchType] = []
}

function updateSearchHistory(this: void, searchType: string, searchValue: string): undefined {
  const settings = asPresent(lib.svData)
  const maxSearchHistoryEntries = asNumber(settings.setSearchHistoryMaxEntries)
  const searchHistory = asSearchHistoryStringMap(settings.setSearchHistory)
  searchHistory[searchType] = searchHistory[searchType] ?? []
  const searchHistoryOfSearchType = asPresent(searchHistory[searchType])
  const toSearch = strlow(searchValue)
  if (!ZO_IsElementInNumericallyIndexedTable(searchHistoryOfSearchType, toSearch)) {
    asPresent(searchHistory[searchType]).unshift(searchValue)
    const countEntries = asPresent(searchHistory[searchType]).length
    if (countEntries > maxSearchHistoryEntries) {
      for (let i = maxSearchHistoryEntries + 1; i <= countEntries; i += 1) {
        asStringOptArray(asPresent(searchHistory[searchType]))[i - 1] = undefined
      }
    }
  }
}

export function updateSearchHistoryDelayed(
  this: void,
  searchType: string,
  searchValue: string
): undefined {
  EM.UnregisterForUpdate(searchHistoryEventUpdaterName)
  EM.RegisterForUpdate(searchHistoryEventUpdaterName, 1500, () => {
    EM.UnregisterForUpdate(searchHistoryEventUpdaterName)
    updateSearchHistory(searchType, searchValue)
  })
}

const wayshrinesAdded: { [wsIndex: number]: boolean } = {}
const wayshrineNames: { [wsIndex: number]: string } = {}

export function checkAndGetWayshrineName(
  this: void,
  p_wayShrines: number[] | undefined
): undefined {
  if (p_wayShrines !== undefined && type(p_wayShrines) === "table") {
    for (const [, wsIndex] of ipairs(p_wayShrines)) {
      if (wsIndex > 0 && !wayshrinesAdded[wsIndex]) {
        const [, wsName] = GetFastTravelNodeInfo(wsIndex)
        if (wsName !== undefined && wsName !== "") {
          const wsNameLocalized = ZO_CachedStrFormat("<<C:1>>", wsName)
          if (wsNameLocalized !== undefined && wsNameLocalized !== "") {
            wayshrinesAdded[wsIndex] = true
            wayshrineNames[wsIndex] = wsNameLocalized
          }
        }
      }
    }
  }
}

type CustomContextMenuEntry = {
  headerName?: string
  name?: string
  entries?: LSMSubmenuEntry[]
  visible?: (this: void, ...args: unknown[]) => unknown
  visibleFunc?: (this: void, ...args: unknown[]) => unknown
}

type CustomContextMenuRegistry = { [key: string]: { [addon: string]: CustomContextMenuEntry } }
function asCustomContextMenuRegistry(value: unknown): CustomContextMenuRegistry {
  return value as CustomContextMenuRegistry
}

export function addOtherAddonsContextMenuEntries(
  this: void,
  rowControl: SearchUIControl,
  _setId: number | undefined
): undefined {
  const customContextMenuEntriesSetSearch = asCustomContextMenuRegistry(
    lib.customContextMenuEntries
  )["setSearchUI"]
  if (customContextMenuEntriesSetSearch === undefined) {
    return
  }
  let dividerWasAdded = false
  const customAddonContextmenuEntries: string[] = []
  for (const [addonName] of pairs(customContextMenuEntriesSetSearch)) {
    customAddonContextmenuEntries.push(asString(addonName))
  }
  tsort(customAddonContextmenuEntries)

  for (const [, addonName] of ipairs(customAddonContextmenuEntries)) {
    const customContextMenuEntriesData = customContextMenuEntriesSetSearch[addonName]
    if (customContextMenuEntriesData !== undefined) {
      const submenuName = customContextMenuEntriesData.name
      const submenuEntries = customContextMenuEntriesData.entries
      if (submenuName !== undefined && submenuEntries !== undefined) {
        let isVisible: unknown = true
        const isVisibleFunc = customContextMenuEntriesData.visibleFunc
        if (isVisibleFunc !== undefined) {
          isVisible = isVisibleFunc(rowControl)
        }
        if (isVisible === true) {
          if (!dividerWasAdded) {
            AddCustomScrollableMenuDivider()
            dividerWasAdded = true
          }
          const headerName = customContextMenuEntriesData.headerName
          if (headerName !== undefined) {
            AddCustomScrollableMenuHeader(headerName)
          }
          AddCustomScrollableSubMenuEntry(submenuName, submenuEntries)
        }
      }
    }
  }
}
