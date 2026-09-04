const lib = LibSets

const CM = CALLBACK_MANAGER
const EM = EVENT_MANAGER

const tcon = table.concat
const tos = tostring
const zoite = ZO_IsTableEmpty

import { asBooleanOpt, asStringArray } from "../lib-sets-casts/lib-sets-casts.module.code.ts"
import {
  asIdBoolMap,
  asLineNumberMapOpt,
} from "../lib-sets-search-ui-casts/lib-sets-search-ui-casts.module.code.ts"
import { getSharedSearchUIClass } from "../lib-sets-search-ui-shared-class/lib-sets-search-ui-shared-class.module.code.ts"
import { updateSearchHistoryDelayed } from "../lib-sets-search-ui-shared-helpers/lib-sets-search-ui-shared-helpers.module.code.ts"
import {
  SEARCH_TYPE_BONUS,
  SEARCH_TYPE_NAME,
  searchUIName,
} from "../lib-sets-search-ui-shared-state/lib-sets-search-ui-shared-state.module.code.ts"

const sharedClass = getSharedSearchUIClass()

const specialBonusSets = lib.specialBonusSets

sharedClass.UpdateSearchHistory = function (
  this: LibSetsSearchUISharedObject,
  editBoxCtrl: SearchUIEditBox
) {
  const searchValue = editBoxCtrl.GetText()
  const isEmptySearch = searchValue === undefined || searchValue === ""
  if (isEmptySearch) {
    return
  }

  const searchType =
    editBoxCtrl === this.searchEditBoxControl ? SEARCH_TYPE_NAME : SEARCH_TYPE_BONUS
  const settings = lib.svData
  if (settings === undefined) {
    return
  }
  const searchSaveHistory =
    searchType === SEARCH_TYPE_NAME
      ? asBooleanOpt(settings.setSearchSaveNameHistory)
      : asBooleanOpt(settings.setSearchSaveBonusHistory)

  if (searchSaveHistory === true) {
    updateSearchHistoryDelayed(searchType, searchValue)
  }
}

sharedClass.GetSetNameSearchString = function (
  this: LibSetsSearchUISharedObject,
  tableOrString: unknown
): string | undefined {
  let setNameStr: string | undefined
  if (type(tableOrString) === "table") {
    const asTable = asStringArray(tableOrString)
    if (asTable.length > 0) {
      setNameStr = tcon(asTable, " ")
    } else {
      return undefined
    }
  } else {
    setNameStr = tos(tableOrString)
  }
  return setNameStr
}

sharedClass.Cancel = function (this: LibSetsSearchUISharedObject) {
  CM.FireCallbacks(`${searchUIName}_SearchCanceled`, this)

  if (this.searchCanceledCallback !== undefined) {
    this.searchCanceledCallback(this)
  }

  this.ResetInternal()

  this.HideUI()
}

sharedClass.ValidateSearchParams = function (
  this: LibSetsSearchUISharedObject
): boolean | undefined {
  return undefined
}

sharedClass.StartSearch = function (
  this: LibSetsSearchUISharedObject,
  doNotShowUI: boolean | undefined,
  wasReset?: boolean
): boolean {
  const didReset = wasReset ?? false
  CM.FireCallbacks(`${searchUIName}_SearchBegin`, this, doNotShowUI, didReset)

  if (this.ValidateSearchParams() === true) {
    if (!didReset) {
      this.lastSearchParams = ZO_ShallowTableCopy(this.searchParams)
    } else {
      this.lastSearchParams = undefined
    }

    this.UpdateSearchButtonEnabledState(false)

    if (this.resultsList !== undefined) {
      this.resultsList.RefreshData()
      return true
    }
  }
  return false
}

sharedClass.Search = function (
  this: LibSetsSearchUISharedObject,
  doNotShowUI: boolean | undefined,
  searchParams: LibSetsSearchParams | undefined
) {
  const dontShow = doNotShowUI ?? false

  if (!dontShow && !this.IsShown()) {
    return
  }

  if (searchParams !== undefined) {
    this.searchParams = searchParams
  }

  if (this.StartSearch(dontShow) === true) {
    if (this.searchDoneCallback !== undefined) {
      this.searchDoneCallback(this)
    }
  } else {
    if (this.searchErrorCallback !== undefined) {
      this.searchErrorCallback(this)
    }
  }
}

function orderedSearch(this: void, haystackIn: string, needlesIn: string): boolean {
  const haystack = string.lower(haystackIn)
  const needles = string.lower(needlesIn)
  let i = 0
  for (const [needle] of string.gmatch(needles, "[^,]+")) {
    if (needle === undefined) {
      break
    }
    const [found] = string.find(haystack, needle, i + 1, true)
    if (found === undefined) {
      return false
    }
    i = found
  }
  return true
}

function searchFilterPrefix(
  this: void,
  searchInput: string,
  searchTab: (string | undefined)[] | undefined,
  isBonusearchIn?: boolean,
  setId?: number
): boolean {
  const isBonusearch = isBonusearchIn ?? false
  let curpos = 1
  let delim = 0
  let exclude = false
  do {
    let found = false
    const [foundDelim] = string.find(searchInput, "[+,-]", curpos)
    delim = foundDelim ?? 0
    let searchQuery = string.sub(searchInput, curpos, delim - 1)
    const [hasContent] = string.find(searchQuery, "[^,]+")
    if (hasContent !== undefined) {
      let bonusLineNr: string | undefined
      let realBonusLineNr: number | undefined
      if (isBonusearch) {
        const searchColonOffset = delim === 0 ? 1 : curpos
        const [bonusLineNrOffset, bonusLineNrOffsetEnd] = string.find(
          searchQuery,
          "%:+",
          searchColonOffset
        )
        if (bonusLineNrOffsetEnd !== undefined && bonusLineNrOffset !== undefined) {
          bonusLineNr = string.sub(searchQuery, bonusLineNrOffsetEnd + 1, -1)
          searchQuery = string.sub(searchQuery, 1, bonusLineNrOffset - 1)
          if (setId !== undefined) {
            const specialBonusSetData = asLineNumberMapOpt(specialBonusSets[setId])
            if (specialBonusSetData !== undefined) {
              const bonusLineNrNum = tonumber(bonusLineNr)
              realBonusLineNr =
                bonusLineNrNum !== undefined ? specialBonusSetData[bonusLineNrNum] : undefined
              if (realBonusLineNr !== undefined) {
                bonusLineNr = tos(realBonusLineNr)
              }
            }
          }
        }
      }
      if (searchTab !== undefined && !zoite(searchTab)) {
        for (let idx = 1; idx <= searchTab.length; idx += 1) {
          const entry = searchTab[idx - 1]
          const bonusLineNrNum = tonumber(bonusLineNr)
          if (
            !isBonusearch ||
            bonusLineNr === undefined ||
            bonusLineNrNum === idx ||
            (realBonusLineNr !== undefined && realBonusLineNr === idx)
          ) {
            if (entry !== undefined && orderedSearch(entry, searchQuery)) {
              found = true
              break
            }
          }
        }
      }

      if (found === exclude) {
        return false
      }
    }
    curpos = delim + 1
    if (delim !== 0) {
      exclude = string.sub(searchInput, delim, delim) === "-"
    }
  } while (delim !== 0)
  return true
}

sharedClass.CheckForMatch = function (
  this: LibSetsSearchUISharedObject,
  data: LibSetsSearchRowData,
  searchInput: string
): boolean {
  const namesOrIdsTab: string[] = []
  namesOrIdsTab.push(data.name)
  namesOrIdsTab.push(tos(data.setId))
  return searchFilterPrefix(searchInput, namesOrIdsTab, undefined, data.setId)
}

sharedClass.ProcessItemEntry = function (
  this: LibSetsSearchUISharedObject,
  _stringSearch: unknown,
  data: LibSetsSearchRowData,
  searchTerm: string,
  _cache?: unknown
): boolean {
  if (data.nameLower !== undefined && zo_plainstrfind(data.nameLower, searchTerm) !== undefined) {
    return true
  }
  return false
}

sharedClass.SearchSetBonuses = function (
  this: LibSetsSearchUISharedObject,
  bonuses: (string | undefined)[] | undefined,
  searchInput: string,
  setId: number | undefined
): boolean {
  return searchFilterPrefix(searchInput, bonuses, true, setId)
}

sharedClass.OnFilterChanged = function (
  this: LibSetsSearchUISharedObject,
  _dropdownControl?: SearchUIControl,
  _editControl?: SearchUIEditBox
) {
  this.searchParams = this.searchParams ?? {}
}

sharedClass.DidAnyFilterChange = function (this: LibSetsSearchUISharedObject): boolean {
  const searchParams = this.searchParams
  const lastSearchParams = this.lastSearchParams
  if (lastSearchParams === undefined) {
    if (searchParams !== undefined) {
      if (zoite(searchParams)) {
        return false
      }
      return true
    }
    return false
  }
  if (lastSearchParams === searchParams) {
    return false
  }

  const countLastSearchParams = NonContiguousCount(lastSearchParams)
  const countSearchParams = NonContiguousCount(searchParams ?? {})

  const baseTabToSearch =
    countSearchParams > countLastSearchParams ? searchParams : lastSearchParams
  const alternativeTabToSearch =
    countSearchParams > countLastSearchParams ? lastSearchParams : searchParams

  if (baseTabToSearch === undefined || alternativeTabToSearch === undefined) {
    return false
  }

  for (const [k, v] of pairs(baseTabToSearch)) {
    const searchParamEntry = alternativeTabToSearch[k]
    if (searchParamEntry !== undefined) {
      if (type(v) === "table") {
        const vTable = asIdBoolMap(v)
        if (zoite(vTable)) {
          return true
        }
        const searchParamEntryTable = asIdBoolMap(searchParamEntry)
        if (NonContiguousCount(vTable) !== NonContiguousCount(searchParamEntryTable)) {
          return true
        }
        for (const [k2, v2] of pairs(vTable)) {
          const lastSearchParamEntry2 = searchParamEntryTable[k2]
          if (lastSearchParamEntry2 === undefined || lastSearchParamEntry2 !== v2) {
            return true
          }
        }
      } else {
        if (v !== searchParamEntry) {
          return true
        }
      }
    } else {
      return true
    }
  }
  return false
}

sharedClass.ThrottledCall = function (
  this: LibSetsSearchUISharedObject,
  callbackName: string,
  timer: number,
  callback: (this: void, ...args: unknown[]) => void,
  ...args: unknown[]
) {
  if (callbackName === "" || callback === undefined) {
    return
  }
  EM.UnregisterForUpdate(callbackName)
  const update = (): undefined => {
    EM.UnregisterForUpdate(callbackName)
    callback(...args)
  }
  EM.RegisterForUpdate(callbackName, timer, update)
}

sharedClass.ModifyWeaponType2hd = function (
  this: LibSetsSearchUISharedObject,
  weaponType: number | undefined
): string | undefined {
  return lib.GetWeaponTypeText(weaponType)
}

sharedClass.SetSearchEditBoxValue = function (
  this: LibSetsSearchUISharedObject,
  editBoxControl: SearchUIEditBox | undefined,
  searchTerm: string
) {
  if (editBoxControl !== undefined && editBoxControl.SetText !== undefined) {
    editBoxControl.SetText(searchTerm)
  }
}
