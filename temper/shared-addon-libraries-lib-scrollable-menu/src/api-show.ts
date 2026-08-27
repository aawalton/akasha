import { asApiComboBoxObjectLike, asBoolean, asControl, asLsmCastApiComboBoxObjectLikeUndefined } from "./casts-1a"
import { asLsmCastRecordStringUnknown, asLsmCastRecordStringUnknown2, asLsmCastRecordStringUnknownUndefined } from "./casts-2b"
import { asLsmCastThisVoidArgUnknownArgsUnknownUnknown, asLsmCastThisVoidAUnknownUnknown, asLsmCastThisVoidComboBoxRecordStringUnknownUndefinedFr, asLsmCastThisVoidControlUnknownAlternativeControlUnknow } from "./casts-3a"
import { asLsmCastThisVoidEntriesUnknownOptionsRecordStringUnkno, asLsmCastThisVoidLogTypeNumberMsgIdNumberArgsUnknownUnd } from "./casts-3b"
import { asLsmCastThisVoidUndefined, asLsmCastUnknown, asObject, asString } from "./casts-4"

type LsmCastLocalContextMenuLike = ContextMenuLike
function asLsmCastLocalContextMenuLike(value: unknown): LsmCastLocalContextMenuLike {
  return value as LsmCastLocalContextMenuLike
}

import { updateContextMenuRef } from "./api"
import { lib } from "./lib-state"

const MAJOR = lib.name

const libDebug = lib.Debug
const dlog = asLsmCastThisVoidLogTypeNumberMsgIdNumberArgsUnknownUnd(libDebug.DebugLog)

const tos = tostring
const sfor = string.format

const tableType = "table"
const booleanType = "boolean"

const constants = lib.constants
const entryTypeConstants = asLsmCastRecordStringUnknown(constants.entryTypes)
const comboBoxConstants = asLsmCastRecordStringUnknown(constants.comboBox)
const defaultComboBoxOptions = comboBoxConstants.defaultComboBoxOptions

const libraryAllowedEntryTypes = asLsmCastRecordStringUnknown(
  entryTypeConstants.libraryAllowedEntryTypes
)

const libUtil = lib.Util
const getControlName = asLsmCastThisVoidControlUnknownAlternativeControlUnknow(
  libUtil.getControlName
)
const getValueOrCallback = asLsmCastThisVoidArgUnknownArgsUnknownUnknown(libUtil.getValueOrCallback)
const hideContextMenu = asLsmCastThisVoidUndefined(libUtil.hideContextMenu)
const getComboBoxsSortedItems = asLsmCastThisVoidComboBoxRecordStringUnknownUndefinedFr(
  libUtil.getComboBoxsSortedItems
)
const validateContextMenuSubmenuEntries = asLsmCastThisVoidEntriesUnknownOptionsRecordStringUnkno(
  libUtil.validateContextMenuSubmenuEntries
)

function setCustomScrollableMenuOptionsImpl(
  this: void,
  options: unknown,
  comboBoxContainer?: unknown
): undefined {
  const g_contextMenu = updateContextMenuRef()
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_DEBUG, 167, tos(getControlName(comboBoxContainer)), tos(options))
  }

  if (comboBoxContainer !== undefined) {
    let comboBox = asLsmCastApiComboBoxObjectLikeUndefined(
      ZO_ComboBox_ObjectFromContainer(asControl(comboBoxContainer))
    )
    if (
      comboBox === undefined &&
      asApiComboBoxObjectLike(comboBoxContainer).m_dropdownObject !== undefined
    ) {
      comboBox = asLsmCastApiComboBoxObjectLikeUndefined(
        ZO_ComboBox_ObjectFromContainer(
          asControl(asApiComboBoxObjectLike(comboBoxContainer).m_dropdownObject)
        )
      )
    }
    if (comboBox !== undefined && comboBox.UpdateOptions !== undefined) {
      comboBox.optionsChanged = options !== comboBox.options
      comboBox.UpdateOptions(options)
    }
  } else {
    const cm = asLsmCastLocalContextMenuLike(g_contextMenu)
    cm.SetContextMenuOptions(options)
  }
}
_G.SetCustomScrollableMenuOptions = setCustomScrollableMenuOptionsImpl
SetCustomScrollableMenuOptions = setCustomScrollableMenuOptionsImpl
const setCustomScrollableMenuOptions = SetCustomScrollableMenuOptions

function clearCustomScrollableMenuImpl(this: void): unknown {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_DEBUG, 168)
  }
  hideContextMenu()

  setCustomScrollableMenuOptions(defaultComboBoxOptions, undefined)
  return true
}
_G.ClearCustomScrollableMenu = clearCustomScrollableMenuImpl
const clearCustomScrollableMenu = clearCustomScrollableMenuImpl

function addCustomScrollableMenuEntriesImpl(
  this: void,
  contextMenuEntries: unknown
): LuaMultiReturn<[boolean, unknown, unknown]> {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_DEBUG, 169, tos(contextMenuEntries))
  }

  let indicesAdded: unknown[] | undefined
  let newAddedEntriesData: Record<string, unknown>[] | undefined

  contextMenuEntries = validateContextMenuSubmenuEntries(
    contextMenuEntries,
    undefined,
    "AddCustomScrollableMenuEntries"
  )
  if (ZO_IsTableEmpty(asObject(contextMenuEntries))) {
    return $multi(false, undefined, undefined)
  }
  for (const [, vValue] of ipairs(asLsmCastUnknown(contextMenuEntries))) {
    const v = asLsmCastRecordStringUnknown(vValue)
    const label = v.label
    if (label !== undefined) {
      if (v.additionalData === undefined) {
        v.additionalData = { label }
      } else if (asLsmCastRecordStringUnknown(v.additionalData).label === undefined) {
        asLsmCastRecordStringUnknown(v.additionalData).label = label
      }
    }
    const [indexAdded, newAddedEntry] = AddCustomScrollableMenuEntry(
      v.name,
      v.callback,
      v.entryType,
      v.entries,
      v.additionalData
    )
    if (indexAdded === undefined || newAddedEntry === undefined) {
      return $multi(false, undefined, undefined)
    }

    indicesAdded = indicesAdded ?? []
    indicesAdded.push(indexAdded)
    newAddedEntriesData = newAddedEntriesData ?? []
    newAddedEntriesData.push(newAddedEntry)
  }
  return $multi(true, indicesAdded, newAddedEntriesData)
}
AddCustomScrollableMenuEntries = addCustomScrollableMenuEntriesImpl
const addCustomScrollableMenuEntries = AddCustomScrollableMenuEntries

AddCustomScrollableMenu = function (
  this: void,
  entries: unknown,
  options?: unknown
): LuaMultiReturn<[boolean, unknown, unknown]> {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_DEBUG, 170, tos(entries), tos(options))
  }
  clearCustomScrollableMenu()

  entries = validateContextMenuSubmenuEntries(
    entries,
    asLsmCastRecordStringUnknownUndefined(options),
    "AddCustomScrollableMenu"
  )

  if (options !== undefined) {
    setCustomScrollableMenuOptions(options)
  }

  return addCustomScrollableMenuEntries(entries)
}

function showCustomScrollableMenuImpl(
  this: void,
  controlToAnchorTo: unknown,
  options?: unknown,
  specialCallbackData?: unknown
): boolean {
  const g_contextMenu = asLsmCastLocalContextMenuLike(updateContextMenuRef())
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_DEBUG, 171, tos(getControlName(controlToAnchorTo)), tos(options))
  }

  const optionsForCallbackFire = options ?? {}
  lib.FireCallbacks("OnDropdownMenuAdded", g_contextMenu, optionsForCallbackFire)
  if (optionsForCallbackFire !== options) {
    options = optionsForCallbackFire
  }
  if (libDebug.doDebug) {
    dlog(
      libDebug.LSM_LOGTYPE_DEBUG_CALLBACK,
      172,
      tos(getControlName(g_contextMenu.m_container)),
      tos(options)
    )
  }

  if (options !== undefined) {
    setCustomScrollableMenuOptions(options)
  }

  if (type(specialCallbackData) === tableType) {
    const scd = asLsmCastRecordStringUnknown(specialCallbackData)
    const uniqueAddonName = getValueOrCallback(scd.addonName, scd)
    if (!(uniqueAddonName !== undefined && uniqueAddonName !== "")) {
      error(
        sfor(
          "[" +
            MAJOR +
            "-ShowCustomScrollableMenu]specialCallbackData.addonName: Unique string expected, got %q",
          tos(uniqueAddonName)
        )
      )
    }
    if (scd.onShowCallback !== undefined) {
      const funcTypeOnShow = type(scd.onShowCallback)
      if (funcTypeOnShow !== "function") {
        error(
          sfor(
            "[" +
              MAJOR +
              "-ShowCustomScrollableMenu]specialCallbackData.onShowCallback: Function expected, got %q",
            tos(funcTypeOnShow)
          )
        )
      }
      g_contextMenu.RegisterSpecialCallback(asString(uniqueAddonName), "onShowCallback", scd)
    }
    if (scd.onHideCallback !== undefined) {
      const funcTypeOnHide = type(scd.onHideCallback)
      if (funcTypeOnHide !== "function") {
        error(
          sfor(
            "[" +
              MAJOR +
              "-ShowCustomScrollableMenu]specialCallbackData.onHideCallback: Function expected, got %q",
            tos(funcTypeOnHide)
          )
        )
      }
      g_contextMenu.RegisterSpecialCallback(asString(uniqueAddonName), "onHideCallback", scd)
    }
  }

  g_contextMenu.ShowContextMenu(controlToAnchorTo)
  return true
}
ShowCustomScrollableMenu = showCustomScrollableMenuImpl

_G.RunCustomScrollableMenuItemsCallback = function (
  this: void,
  comboBox: unknown,
  item: unknown,
  myAddonCallbackFunc: unknown,
  filterEntryTypes: unknown,
  fromParentMenu: unknown,
  ...args: unknown[]
): LuaMultiReturn<[boolean, unknown]> {
  return runCustomScrollableMenuItemsCallbackImpl(
    comboBox,
    item,
    myAddonCallbackFunc,
    filterEntryTypes,
    fromParentMenu,
    ...args
  )
}
function runCustomScrollableMenuItemsCallbackImpl(
  this: void,
  comboBox: unknown,
  item: unknown,
  myAddonCallbackFunc: unknown,
  filterEntryTypes: unknown,
  fromParentMenu: unknown,
  ...args: unknown[]
): LuaMultiReturn<[boolean, unknown]> {
  const g_contextMenu = asLsmCastLocalContextMenuLike(updateContextMenuRef())
  const assertFuncName = "RunCustomScrollableMenuItemsCallback"
  const addonCallbackFuncType = type(myAddonCallbackFunc)
  if (addonCallbackFuncType !== "function") {
    error(
      sfor(
        "[" + MAJOR + ":" + assertFuncName + "] myAddonCallbackFunc: function expected, got %q",
        tos(addonCallbackFuncType)
      )
    )
  }

  const options = g_contextMenu.GetOptions()

  const gotFilterEntryTypes = (filterEntryTypes !== undefined && true) || false
  const filterEntryTypesTable =
    (gotFilterEntryTypes === true && getValueOrCallback(filterEntryTypes, options)) || undefined
  const filterEntryTypesTableType =
    (filterEntryTypesTable !== undefined && type(filterEntryTypesTable)) || undefined
  if (
    !(
      gotFilterEntryTypes === false ||
      (gotFilterEntryTypes === true && filterEntryTypesTableType === tableType)
    )
  ) {
    error(
      sfor(
        "[" +
          MAJOR +
          ":" +
          assertFuncName +
          "] filterEntryTypes: table or function returning a table expected, got %q",
        tos(filterEntryTypesTableType)
      )
    )
  }

  let fromParentMenuValue: unknown
  if (fromParentMenu === undefined) {
    fromParentMenuValue = false
  } else {
    fromParentMenuValue = getValueOrCallback(fromParentMenu, options)
    if (type(fromParentMenuValue) !== booleanType) {
      error(
        sfor(
          "[" + MAJOR + ":" + assertFuncName + "] fromParentMenu: boolean expected, got %q",
          tos(type(fromParentMenu))
        )
      )
    }
  }

  const sortedItems = getComboBoxsSortedItems(
    asLsmCastRecordStringUnknownUndefined(comboBox),
    asBoolean(fromParentMenuValue),
    false
  )
  if (ZO_IsTableEmpty(asObject(sortedItems))) {
    return $multi(false, undefined)
  }

  let itemsForCallbackFunc = asLsmCastRecordStringUnknown2(sortedItems)

  if (gotFilterEntryTypes === true && !ZO_IsTableEmpty(asObject(filterEntryTypesTable))) {
    const allowedEntryTypes: Record<string, boolean> = {}
    for (const [, entryTypeToFilter] of ipairs(asLsmCastUnknown(filterEntryTypesTable))) {
      if (libraryAllowedEntryTypes[asString(entryTypeToFilter)]) {
        allowedEntryTypes[asString(entryTypeToFilter)] = true
      }
    }

    if (!ZO_IsTableEmpty(allowedEntryTypes)) {
      const filteredTab: Record<string, unknown>[] = []
      for (const [, vItem] of ipairs(itemsForCallbackFunc)) {
        const v = asLsmCastRecordStringUnknown(vItem)
        const itemsEntryType = v.entryType
        if (itemsEntryType !== undefined && allowedEntryTypes[asString(itemsEntryType)]) {
          filteredTab[filteredTab.length] = v
        }
      }
      itemsForCallbackFunc = filteredTab
    }
  }

  return $multi(
    true,
    asLsmCastThisVoidAUnknownUnknown(myAddonCallbackFunc)(
      comboBox,
      item,
      itemsForCallbackFunc,
      ...args
    )
  )
}
