import { asEventManagerLike } from "./casts-1a"
import { asLsmCastContextMenuObjectUndefined, asLsmCastGetOptionsThisUnknownRecordStringUnknown } from "./casts-1b"
import { asLsmCastHiddenForReasonsThisUnknownButtonIdUnknownBool, asLsmCastIsDropdownVisibleThisUnknownBoolean, asLsmCastIsDropdownVisibleThisUnknownBooleanHideDropdow2 } from "./casts-2a"
import { asLsmCastRecordStringUnknown, asLsmCastRecordStringUnknownUndefined } from "./casts-2b"
import { asLsmCastThisVoidArgsUnknownUndefinedUndefined2, asLsmCastThisVoidAUnknownUnknown, asLsmCastThisVoidContextMenuObjectUndefined } from "./casts-3a"
import { asLsmCastThisVoidOptionsRecordStringUnknownUndefinedUnk, asLsmCastThisVoidPreventerVarNameStringLuaMultiReturnBo } from "./casts-3b"
import { asObject, asString } from "./casts-4"

import { constants, getValueOrCallback } from "./constants-core"
import { getContextMenu, lib, setContextMenu } from "./lib-state"

const libUtil = lib.Util

const libDebug = lib.Debug

const dlog = asLsmCastThisVoidArgsUnknownUndefinedUndefined2(libDebug.DebugLog)

const EM = asEventManagerLike(GetEventManager())
const tos = tostring
const sfor = string.format

const functionType = "function"
const tableType = "table"

const handlerNameConstants = constants.handlerNames

let throttledCallDelaySuffixCounter = 0
const throttledCallDelayName = handlerNameConstants.throttledCallDelayName
const throttledCallDelay = constants.throttledCallDelay

let contextMenuContainer: unknown

const libUtil_checkAndUpdatePreventerVar = asLsmCastThisVoidPreventerVarNameStringLuaMultiReturnBo(
  libUtil.checkAndUpdatePreventerVar
)

libUtil.getOptionsForDropdown = function (
  this: void,
  dropdown: Record<string, unknown>
): Record<string, unknown> {
  if (libDebug.doDebug === true && dlog !== undefined) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 21)
  }
  return (
    asLsmCastRecordStringUnknownUndefined(asLsmCastRecordStringUnknown(dropdown.owner).options) ??
    {}
  )
}

libUtil.mixinTableAndSkipExisting = function (
  this: void,
  targetData: Record<string, unknown>,
  sourceData: unknown,
  doNotSkipTable: Record<string, unknown> | undefined,
  callbackFunc: unknown,
  ...args: unknown[]
): undefined {
  if (libDebug.doDebug === true && dlog !== undefined) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 10, tos(callbackFunc))
  }
  const useDoNotSkipTable =
    type(doNotSkipTable) === tableType && !ZO_IsTableEmpty(asObject(doNotSkipTable))
  const useCallback = type(callbackFunc) === functionType
  const count = select("#", sourceData)
  for (let i = 1; i <= count; i += 1) {
    const [source] = select(i, sourceData)
    for (const [k, v] of pairs(asLsmCastRecordStringUnknown(source))) {
      let doOverwrite = targetData[k] === undefined
      const doNotSkipDataOfKey =
        (useDoNotSkipTable &&
          type(asLsmCastRecordStringUnknown(doNotSkipTable)[k]) === tableType &&
          asLsmCastRecordStringUnknown(asLsmCastRecordStringUnknown(doNotSkipTable)[k])) ||
        undefined

      if (doOverwrite || doNotSkipDataOfKey !== undefined) {
        let newValue: unknown = v

        if (!doOverwrite && !useCallback && useDoNotSkipTable && doNotSkipDataOfKey !== undefined) {
          const ifEqualsCondResult = getValueOrCallback(doNotSkipDataOfKey.ifEquals)
          if (targetData[k] === ifEqualsCondResult) {
            newValue = getValueOrCallback(doNotSkipDataOfKey.changeTo)
            doOverwrite = newValue !== targetData[k]
          }
        }

        if (doOverwrite) {
          targetData[k] =
            (useCallback === true && asLsmCastThisVoidAUnknownUnknown(callbackFunc)(v, ...args)) ||
            newValue
        }
      }
    }
  }
}

libUtil.throttledCall = function (
  this: void,
  callback: (this: void) => undefined,
  delay: number | undefined,
  throttledCallNameSuffix?: string
): undefined {
  delay = delay ?? throttledCallDelay
  throttledCallDelaySuffixCounter = throttledCallDelaySuffixCounter + 1
  throttledCallNameSuffix = throttledCallNameSuffix ?? tos(throttledCallDelaySuffixCounter)
  const throttledCallDelayTotalName = throttledCallDelayName + throttledCallNameSuffix
  if (libDebug.doDebug === true && dlog !== undefined) {
    dlog(
      libDebug.LSM_LOGTYPE_VERBOSE,
      4,
      tos(callback),
      tos(delay),
      tos(throttledCallDelayTotalName)
    )
  }
  EM.UnregisterForUpdate(throttledCallDelayTotalName)
  EM.RegisterForUpdate(throttledCallDelayTotalName, delay, function (this: void): undefined {
    EM.UnregisterForUpdate(throttledCallDelayTotalName)
    if (libDebug.doDebug === true && dlog !== undefined) {
      dlog(libDebug.LSM_LOGTYPE_VERBOSE, 5, tos(callback), tos(throttledCallDelayTotalName))
    }
    callback()
  })
}

libUtil.getContextMenuReference = function (this: void): ContextMenuObject | undefined {
  let g_contextMenu = getContextMenu()
  g_contextMenu = g_contextMenu ?? asLsmCastContextMenuObjectUndefined(lib.contextMenu)
  setContextMenu(g_contextMenu)
  return g_contextMenu
}
const getContextMenuReference = asLsmCastThisVoidContextMenuObjectUndefined(
  libUtil.getContextMenuReference
)

libUtil.belongsToContextMenuCheck = function (this: void, ctrl: unknown): boolean {
  const g_contextMenu = getContextMenuReference()
  setContextMenu(g_contextMenu)
  contextMenuContainer =
    contextMenuContainer ?? asLsmCastRecordStringUnknownUndefined(g_contextMenu)?.m_container

  const dropdownObject =
    (ctrl !== undefined && asLsmCastRecordStringUnknown(ctrl).m_dropdownObject) || undefined
  if (dropdownObject) {
    return contextMenuContainer === asLsmCastRecordStringUnknown(dropdownObject).m_container
  }
  return false
}

libUtil.hideContextMenu = function (this: void): undefined {
  const g_contextMenu = getContextMenuReference()
  setContextMenu(g_contextMenu)
  if (g_contextMenu === undefined) {
    return
  }

  const cm = asLsmCastIsDropdownVisibleThisUnknownBooleanHideDropdow2(g_contextMenu)
  if (cm.IsDropdownVisible()) {
    cm.HideDropdown()
  }

  const [wasProcessed] = libUtil_checkAndUpdatePreventerVar("suppressNextHideContextMenuClearItems")
  if (wasProcessed) {
    return
  }
  cm.ClearItems()
}

libUtil.validateContextMenuSubmenuEntries = function (
  this: void,
  entries: unknown,
  options: Record<string, unknown> | undefined,
  calledByStr: string
): unknown {
  let entryTableType = type(entries)
  if (entryTableType === "function") {
    const g_contextMenu = getContextMenuReference()
    setContextMenu(g_contextMenu)
    options =
      options ?? asLsmCastGetOptionsThisUnknownRecordStringUnknown(g_contextMenu).GetOptions()
    const entriesOfPassedInEntriesFunc =
      asLsmCastThisVoidOptionsRecordStringUnknownUndefinedUnk(entries)(options)
    entryTableType = type(entriesOfPassedInEntriesFunc)
    if (entryTableType !== "table") {
      error(
        sfor("[" + lib.name + "]" + calledByStr + " - table expected, got %q", tos(entryTableType))
      )
    }
    entries = entriesOfPassedInEntriesFunc
  }
  return entries
}

libUtil.checkIfContextMenuOpenedButOtherControlWasClicked = function (
  this: void,
  _control: unknown,
  comboBox: unknown,
  buttonId: unknown
): boolean {
  getContextMenuReference()
  const g_contextMenu = getContextMenu()
  const cm = asLsmCastIsDropdownVisibleThisUnknownBoolean(g_contextMenu)
  if (libDebug.doDebug === true && dlog !== undefined) {
    dlog(
      libDebug.LSM_LOGTYPE_VERBOSE,
      29,
      tos(comboBox === g_contextMenu),
      tos(cm.IsDropdownVisible())
    )
  }
  if (comboBox !== g_contextMenu && cm.IsDropdownVisible()) {
    if (comboBox !== undefined) {
      return asLsmCastHiddenForReasonsThisUnknownButtonIdUnknownBool(comboBox).HiddenForReasons(
        buttonId
      )
    }
  }
  return false
}

libUtil.getButtonGroupOfEntryType = function (
  this: void,
  comboBox: Record<string, unknown>,
  groupIndex: unknown,
  entryType: unknown
): unknown {
  const buttonGroupObject = asLsmCastRecordStringUnknownUndefined(comboBox.m_buttonGroup)
  const buttonGroupOfEntryType =
    (buttonGroupObject !== undefined &&
      buttonGroupObject[asString(entryType)] !== undefined &&
      asLsmCastRecordStringUnknown(buttonGroupObject[asString(entryType)])[asString(groupIndex)]) ||
    undefined
  return buttonGroupOfEntryType
}
