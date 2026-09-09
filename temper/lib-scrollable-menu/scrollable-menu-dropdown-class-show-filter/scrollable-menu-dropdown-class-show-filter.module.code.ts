import {
  asLsmCastIsFilterEnabledThisUnknownUnknown,
  asLsmCastMDropdownUnknown,
} from "../scrollable-menu-casts-2a/scrollable-menu-casts-2a.module.code.ts"
import {
  asLsmCastNumberUndefined,
  asLsmCastReadonlyDataTableStringDataNameStringGetFuncSt,
  asLsmCastRecordNumberReadonlyDataTableStringDataNameStr,
  asLsmCastRecordNumberUnknown,
  asLsmCastRecordStringUnknown,
  asLsmCastRecordStringUnknownUndefined,
  asLsmCastResetFiltersThisUnknownDropdownUnknownUndefine,
} from "../scrollable-menu-casts-2b/scrollable-menu-casts-2b.module.code.ts"
import { asLsmCastThisVoidArgsUnknownUndefined } from "../scrollable-menu-casts-3a/scrollable-menu-casts-3a.module.code.ts"
import {
  asLsmCastThisVoidControlUnknownUnknown,
  asLsmCastThisVoidDataUnknownUndefined,
  asLsmCastThisVoidItemUnknownComboBoxUnknownFilterFuncUn,
} from "../scrollable-menu-casts-3b/scrollable-menu-casts-3b.module.code.ts"
import {
  asNumber,
  asObject,
  asString,
} from "../scrollable-menu-casts-4/scrollable-menu-casts-4.module.code.ts"

import { getValueOrCallback } from "../scrollable-menu-constants-core/scrollable-menu-constants-core.module.code.ts"
import { lib } from "../scrollable-menu-lib-state/scrollable-menu-lib-state.module.code.ts"

const libDebug = lib.Debug
const dlog = asLsmCastThisVoidArgsUnknownUndefined(libDebug.DebugLog)

const tos = tostring
const ton = tonumber
const STRING_TYPE = "string"
const FUNCTION_TYPE = "function"

const constants = lib.constants
const searchFilterConstants = asLsmCastRecordStringUnknown(constants.searchFilter)

const FILTERED_ENTRY_TYPES = asLsmCastRecordNumberUnknown(searchFilterConstants.filteredEntryTypes)
const FILTERED_ENTRY_TYPS_CHILDS_TO_SEARCH =
  asLsmCastRecordNumberReadonlyDataTableStringDataNameStr(
    searchFilterConstants.filteredEntryTypsChildsToSearch
  )
const FILTER_NAMES_EXEMPTS = asLsmCastRecordStringUnknown(searchFilterConstants.filterNamesExempts)

const updateDataByFunctions = asLsmCastThisVoidDataUnknownUndefined(lib.Util.updateDataByFunctions)
const recursiveOverEntries = asLsmCastThisVoidItemUnknownComboBoxUnknownFilterFuncUn(
  lib.Util.recursiveOverEntries
)

let runCustomScrollableMenuItemsCallback: typeof RunCustomScrollableMenuItemsCallback | undefined

interface LsmFilterScratch {
  lastEntryVisible: boolean
}
function asLsmFilterScratch(value: unknown): LsmFilterScratch {
  return value as LsmFilterScratch
}
const FILTER_SCRATCH = asLsmFilterScratch(lib.lsmFilterScratch)

let ignoreSubmenu: string | boolean | undefined
let filterString: string | undefined
let filterStringIsNumber: boolean | undefined
let filterStringIsBoolean: boolean | undefined
let filterFunc: ((this: void, item: unknown, filterString: unknown) => unknown) | undefined

type LsmCastLocalNonNullableTypeofFilterFunc = NonNullable<typeof filterFunc>
function asLsmCastLocalNonNullableTypeofFilterFunc(
  value: unknown
): LsmCastLocalNonNullableTypeofFilterFunc {
  return value as LsmCastLocalNonNullableTypeofFilterFunc
}

type LsmCastLocalGetFilterFunctionThisUnknownTypeofFilterFunc = {
  GetFilterFunction: (this: unknown) => typeof filterFunc
}
function asLsmCastLocalGetFilterFunctionThisUnknownTypeofFilterFunc(
  value: unknown
): LsmCastLocalGetFilterFunctionThisUnknownTypeofFilterFunc {
  return value as LsmCastLocalGetFilterFunctionThisUnknownTypeofFilterFunc
}

function parseLuaCapture(this: void, captured: unknown): string | undefined {
  return typeof captured === "string" ? captured : undefined
}

const isBoolean = new LuaTable<boolean | string, boolean>()
isBoolean.set(true, true)
isBoolean.set(false, true)
isBoolean.set("true", true)
isBoolean.set("false", true)

function initDropdownFilterState(
  this: void,
  self: DropdownObject,
  comboBox: DropdownComboBox,
  comboBoxObject: DropdownComboBox
): boolean {
  ignoreSubmenu = undefined
  filterString = undefined
  filterFunc = undefined
  filterStringIsBoolean = undefined
  filterStringIsNumber = undefined
  FILTER_SCRATCH.lastEntryVisible = false
  if (asLsmCastIsFilterEnabledThisUnknownUnknown(self).IsFilterEnabled()) {
    const [ignoreSubmenuRaw, filterStringRaw] = string.match(
      asString(comboBoxObject.filterString),
      "(/?)(.*)"
    )
    ignoreSubmenu = parseLuaCapture(ignoreSubmenuRaw)
    filterString = parseLuaCapture(filterStringRaw)
    filterFunc =
      asLsmCastLocalGetFilterFunctionThisUnknownTypeofFilterFunc(comboBoxObject).GetFilterFunction()
  } else {
    asLsmCastResetFiltersThisUnknownDropdownUnknownUndefine(self).ResetFilters(
      asLsmCastMDropdownUnknown(comboBoxObject).m_dropdown
    )
  }
  filterString = filterString ?? ""
  filterStringIsNumber =
    (filterString !== "" && type(ton(filterString)) === "number" && true) || false
  filterStringIsBoolean = isBoolean.get(filterString) || false

  ignoreSubmenu = ignoreSubmenu === "/"

  let textSearchEnabled = filterString !== ""
  if (textSearchEnabled && comboBox.isSubmenu) {
    if (ignoreSubmenu === true) {
      textSearchEnabled = false
    }
  }
  return textSearchEnabled
}

function verifyLabelString(this: void, data: Record<string, unknown>): boolean {
  updateDataByFunctions(data)
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 18, tos(data.name))
  }
  return type(data.name) === STRING_TYPE
}

function checkIfChildControlTextMatches(
  this: void,
  item: Record<string, unknown>,
  entryType: number | undefined,
  filterNamesExemptsCheck: boolean
): LuaMultiReturn<[unknown, unknown]> {
  const childControlsToCheck = FILTERED_ENTRY_TYPS_CHILDS_TO_SEARCH[asNumber(entryType)]
  if (ZO_IsTableEmpty(asObject(childControlsToCheck))) {
    return $multi(filterNamesExemptsCheck, undefined)
  }

  for (const [, childControlData] of ipairs(
    asLsmCastReadonlyDataTableStringDataNameStringGetFuncSt(childControlsToCheck)
  )) {
    if (
      childControlData.dataTable !== undefined &&
      childControlData.dataName !== undefined &&
      childControlData.getFunc !== undefined
    ) {
      const getFuncReturnType = childControlData.getFuncReturnType ?? "string"
      const dataTable = asLsmCastRecordStringUnknownUndefined(item[childControlData.dataTable])
      const childControl =
        (dataTable !== undefined &&
          asLsmCastRecordStringUnknownUndefined(dataTable[childControlData.dataName])) ||
        undefined
      if (childControl !== undefined && childControl[childControlData.getFunc] !== undefined) {
        const textToCheck = tos(
          asLsmCastThisVoidControlUnknownUnknown(childControl[childControlData.getFunc])(
            childControl
          )
        )
        if (getFuncReturnType === "number") {
          if (!filterStringIsNumber) {
            return $multi(filterNamesExemptsCheck, undefined)
          }
        } else if (getFuncReturnType === "boolean") {
          if (!filterStringIsBoolean) {
            return $multi(filterNamesExemptsCheck, undefined)
          }
        }

        if (textToCheck !== undefined && textToCheck !== "nil") {
          if (!FILTER_NAMES_EXEMPTS[textToCheck]) {
            const newItem = asLsmCastRecordStringUnknown(ZO_ShallowTableCopy(item))
            newItem.label = textToCheck
            newItem.name = textToCheck
            if (
              asLsmCastLocalNonNullableTypeofFilterFunc(filterFunc)(newItem, filterString) === true
            ) {
              return $multi(true, true)
            }
          }
        }
      }
    }
  }
  return $multi(filterNamesExemptsCheck, undefined)
}

function passItemToSearch(
  this: void,
  item: Record<string, unknown>,
  entryType: number | undefined
): LuaMultiReturn<[unknown, unknown]> {
  if (filterString !== "") {
    const name = item.label || item.name
    const doExtraEntryTypeCheck = (entryType !== undefined && true) || false
    if (name === undefined && doExtraEntryTypeCheck === false) {
      return $multi(false, undefined)
    }

    const filterNamesExemptsCheck = !FILTER_NAMES_EXEMPTS[asString(name)]
    if (doExtraEntryTypeCheck === true) {
      return checkIfChildControlTextMatches(item, entryType, filterNamesExemptsCheck)
    }
    return $multi(filterNamesExemptsCheck, undefined)
  }
  return $multi(false, undefined)
}

function filterResults(
  this: void,
  item: Record<string, unknown>,
  comboBox: unknown,
  _dropdownObject: unknown
): unknown {
  const entryType = asLsmCastNumberUndefined(item.entryType)
  if (entryType == null || FILTERED_ENTRY_TYPES[entryType]) {
    let doNotFilter: unknown
    if (type(item.doNotFilter) === FUNCTION_TYPE && comboBox !== undefined) {
      const doNotFilterEntryTypes =
        getValueOrCallback(item.doNotFilterEntryTypes, item) || undefined
      runCustomScrollableMenuItemsCallback =
        runCustomScrollableMenuItemsCallback ?? RunCustomScrollableMenuItemsCallback
      const [, doNotFilterRet] = runCustomScrollableMenuItemsCallback(
        comboBox,
        item,
        item.doNotFilter,
        doNotFilterEntryTypes,
        false
      )
      doNotFilter = doNotFilterRet
    } else {
      doNotFilter = getValueOrCallback(item.doNotFilter, item) || false
    }
    if (doNotFilter === true) {
      return true
    }
    const [doSearch, searchResultChildControls] = passItemToSearch(item, entryType)
    if (doSearch === true) {
      const retVar =
        (searchResultChildControls === undefined &&
          asLsmCastLocalNonNullableTypeofFilterFunc(filterFunc)(item, filterString)) ||
        searchResultChildControls

      if (retVar === true && searchResultChildControls !== undefined) {
      }
      return retVar
    }
  } else {
    return FILTER_SCRATCH.lastEntryVisible
  }
}

function itemPassesFilter(
  this: void,
  item: Record<string, unknown>,
  comboBox: unknown,
  doFilter: unknown,
  dropdownObject: unknown
): unknown {
  if (verifyLabelString(item)) {
    if (doFilter) {
      return recursiveOverEntries(item, comboBox, filterResults, dropdownObject)
    } else {
      return true
    }
  }
}

lib.lsmInitDropdownFilterState = initDropdownFilterState
lib.lsmItemPassesFilter = itemPassesFilter
