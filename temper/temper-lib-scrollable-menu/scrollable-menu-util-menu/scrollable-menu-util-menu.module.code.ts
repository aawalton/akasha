import { asEventManagerLike } from "../scrollable-menu-casts-1a/scrollable-menu-casts-1a.module.code.ts"
import {
  asLsmCastContextMenuObjectUndefined,
  asLsmCastGetOptionsThisUnknownRecordStringUnknown,
} from "../scrollable-menu-casts-1b/scrollable-menu-casts-1b.module.code.ts"
import {
  asLsmCastHiddenForReasonsThisUnknownButtonIdUnknownBool,
  asLsmCastIsDropdownVisibleThisUnknownBoolean,
  asLsmCastIsDropdownVisibleThisUnknownBooleanHideDropdow2,
} from "../scrollable-menu-casts-2a/scrollable-menu-casts-2a.module.code.ts"
import {
  asLsmCastRecordStringUnknown,
  asLsmCastRecordStringUnknownUndefined,
} from "../scrollable-menu-casts-2b/scrollable-menu-casts-2b.module.code.ts"
import {
  asLsmCastThisVoidArgsUnknownUndefinedUndefined2,
  asLsmCastThisVoidAUnknownUnknown,
  asLsmCastThisVoidContextMenuObjectUndefined,
} from "../scrollable-menu-casts-3a/scrollable-menu-casts-3a.module.code.ts"
import {
  asLsmCastThisVoidOptionsRecordStringUnknownUndefinedUnk,
  asLsmCastThisVoidPreventerVarNameStringLuaMultiReturnBo,
} from "../scrollable-menu-casts-3b/scrollable-menu-casts-3b.module.code.ts"
import {
  asObject,
  asString,
} from "../scrollable-menu-casts-4/scrollable-menu-casts-4.module.code.ts"

import {
  constants,
  getValueOrCallback,
} from "../scrollable-menu-constants-core/scrollable-menu-constants-core.module.code.ts"
import {
  getContextMenu,
  lib,
  setContextMenu,
} from "../scrollable-menu-lib-state/scrollable-menu-lib-state.module.code.ts"

const libUtil = lib.Util

const libDebug = lib.Debug

const dlog = asLsmCastThisVoidArgsUnknownUndefinedUndefined2(libDebug.DebugLog)

const EM = asEventManagerLike(GetEventManager())
const tos = tostring
const sfor = string.format

const FUNCTION_TYPE = "function"
const TABLE_TYPE = "table"

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
    type(doNotSkipTable) === TABLE_TYPE && !ZO_IsTableEmpty(asObject(doNotSkipTable))
  const useCallback = type(callbackFunc) === FUNCTION_TYPE
  const count = select("#", sourceData)
  for (let i = 1; i <= count; i += 1) {
    const [source] = select(i, sourceData)
    for (const [k, v] of pairs(asLsmCastRecordStringUnknown(source))) {
      let doOverwrite = targetData[k] === undefined
      const doNotSkipDataOfKey =
        (useDoNotSkipTable &&
          type(asLsmCastRecordStringUnknown(doNotSkipTable)[k]) === TABLE_TYPE &&
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
  let gContextMenu = getContextMenu()
  gContextMenu = gContextMenu ?? asLsmCastContextMenuObjectUndefined(lib.contextMenu)
  setContextMenu(gContextMenu)
  return gContextMenu
}
const getContextMenuReference = asLsmCastThisVoidContextMenuObjectUndefined(
  libUtil.getContextMenuReference
)

libUtil.belongsToContextMenuCheck = function (this: void, ctrl: unknown): boolean {
  const gContextMenu = getContextMenuReference()
  setContextMenu(gContextMenu)
  contextMenuContainer =
    contextMenuContainer ?? asLsmCastRecordStringUnknownUndefined(gContextMenu)?.m_container

  const dropdownObject =
    (ctrl !== undefined && asLsmCastRecordStringUnknown(ctrl).m_dropdownObject) || undefined
  if (dropdownObject) {
    return contextMenuContainer === asLsmCastRecordStringUnknown(dropdownObject).m_container
  }
  return false
}

libUtil.hideContextMenu = function (this: void): undefined {
  const gContextMenu = getContextMenuReference()
  setContextMenu(gContextMenu)
  if (gContextMenu === undefined) {
    return
  }

  const cm = asLsmCastIsDropdownVisibleThisUnknownBooleanHideDropdow2(gContextMenu)
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
    const gContextMenu = getContextMenuReference()
    setContextMenu(gContextMenu)
    options =
      options ?? asLsmCastGetOptionsThisUnknownRecordStringUnknown(gContextMenu).GetOptions()
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
  const gContextMenu = getContextMenu()
  const cm = asLsmCastIsDropdownVisibleThisUnknownBoolean(gContextMenu)
  if (libDebug.doDebug === true && dlog !== undefined) {
    dlog(
      libDebug.LSM_LOGTYPE_VERBOSE,
      29,
      tos(comboBox === gContextMenu),
      tos(cm.IsDropdownVisible())
    )
  }
  if (comboBox !== gContextMenu && cm.IsDropdownVisible()) {
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
