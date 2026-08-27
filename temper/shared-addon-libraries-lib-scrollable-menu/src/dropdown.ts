import { asBoolean, asControl, asDropdownClassPrivate, asDropdownObject, asDropdownRowControl, asDropdownRowHighlightData } from "./casts-1a"
import { asLsmCastDropdownClassPrivateCheckIfEntryRaisesAutomati, asLsmCastDropdownComboBoxUndefined, asLsmCastDropdownRowControlUndefined } from "./casts-1b"
import { asLsmCastM_dropdownObjectControlBringWindowToTopThisUnk } from "./casts-2a"
import { asLsmCastReadonlyUnknown, asLsmCastReadonlyUnknownUndefined, asLsmCastRecordNumberBoolean, asLsmCastRecordStringUnknown } from "./casts-2b"
import { asLsmCastThisVoidArgsUnknownUndefined, asLsmCastThisVoidArgsUnknownUnknown, asLsmCastThisVoidAUnknownBoolean, asLsmCastThisVoidAUnknownUnknown, asLsmCastThisVoidContextMenuObject } from "./casts-3a"
import { asLsmCastThisVoidControlUnknownAltUnknownString, asLsmCastThisVoidControlUnknownRecordStringUnknown, asLsmCastThisVoidItemUnknownComboBoxUnknownFilterFuncUn } from "./casts-3b"
import { asObject, asString } from "./casts-4"

import { getValueOrCallback } from "./constants-core"
import { getContextMenu, lib, setContextMenu } from "./lib-state"

const libDebug = lib.Debug
const debugPrefix = libDebug.prefix
const dlog = asLsmCastThisVoidArgsUnknownUndefined(libDebug.DebugLog)

const tos = tostring
const ton = tonumber
const functionType = "function"

const classes = asLsmCastRecordStringUnknown(lib.classes)

let LSM_IsContextMenuCurrentlyShown: ((this: void) => boolean) | undefined

const LSM_normalMenuRefreshDone = 1
const LSM_submenuRefreshDone = 2

const constants = lib.constants
const entryTypeConstants = asLsmCastRecordStringUnknown(constants.entryTypes)
const onEntryMouseUpExcludeEntryTypes = asLsmCastRecordNumberBoolean(
  entryTypeConstants.onEntryMouseUpExclude
)

const allowedEntryDataAutomaticUpdateRaise = asLsmCastReadonlyUnknown(
  entryTypeConstants.dataAllowedAutomaticUpdateRaise
)

const updateEntryPathsData = asLsmCastRecordStringUnknown(entryTypeConstants.updateEntryPathsData)
const updateEntryPath = updateEntryPathsData.updateEntryPath
const updateIconPath = updateEntryPathsData.updateIconPath
const updateEntryPathCheckFunc = updateEntryPathsData.updateEntryPathCheckFunc

const getControlName = asLsmCastThisVoidControlUnknownAltUnknownString(lib.Util.getControlName)
const getControlData = asLsmCastThisVoidControlUnknownRecordStringUnknown(lib.Util.getControlData)
const getContextMenuReference = asLsmCastThisVoidContextMenuObject(lib.Util.getContextMenuReference)
const recursiveOverEntries = asLsmCastThisVoidItemUnknownComboBoxUnknownFilterFuncUn(
  lib.Util.recursiveOverEntries
)

const dropdownClassPrivate = asDropdownClassPrivate({})
classes.dropdownClassPrivate = dropdownClassPrivate
dropdownClassPrivate.onEntryMouseUpExcludeEntryTypes = onEntryMouseUpExcludeEntryTypes

function checkIfContextMenuVisibleAndBringToTopAgain(
  this: void,
  _dropdown: unknown,
  _comboBox: unknown,
  delay?: number
): undefined {
  setContextMenu(getContextMenuReference())
  LSM_IsContextMenuCurrentlyShown =
    LSM_IsContextMenuCurrentlyShown ?? IsCustomScrollableContextMenuShown
  if (!LSM_IsContextMenuCurrentlyShown()) {
    return
  }

  delay = delay ?? 10

  zo_callLater(function (this: void): undefined {
    const g_contextMenu = asLsmCastM_dropdownObjectControlBringWindowToTopThisUnk(getContextMenu())
    g_contextMenu.m_dropdownObject.control.BringWindowToTop()
  }, delay)
}
dropdownClassPrivate.checkIfContextMenuVisibleAndBringToTopAgain =
  checkIfContextMenuVisibleAndBringToTopAgain

function LSM_CheckIfAnimationControlNeedsXMLTemplateChange(
  this: void,
  control: unknown,
  controlTemplate: unknown
): boolean {
  let retVar = false
  const ctrl = asLsmCastDropdownRowControlUndefined(control)
  if (ctrl !== undefined && controlTemplate !== undefined) {
    const rowHighlightData = ctrl.LSM_rowHighlightData
    const highlightControlXMLTemplate = rowHighlightData?.highlightXMLTemplate || undefined
    if (
      highlightControlXMLTemplate !== undefined &&
      highlightControlXMLTemplate !== controlTemplate
    ) {
      const animationFieldName = asDropdownRowHighlightData(rowHighlightData).animationFieldName
      if (
        animationFieldName !== undefined &&
        animationFieldName !== "" &&
        ctrl[animationFieldName] !== undefined
      ) {
        ctrl[animationFieldName] = undefined

        const highlightControlName =
          asDropdownRowHighlightData(rowHighlightData).highlightControlName
        if (highlightControlName !== undefined) {
          if (_G[highlightControlName] !== undefined) {
            _G[highlightControlName] = undefined
          }
        }
      }
      retVar = true
    }
  }

  if (ctrl !== undefined) {
    ctrl.LSM_rowHighlightData = undefined
  }
  return retVar
}
dropdownClassPrivate.LSM_CheckIfAnimationControlNeedsXMLTemplateChange =
  LSM_CheckIfAnimationControlNeedsXMLTemplateChange

function multiIconCheckFunc(
  this: void,
  _comboBox: unknown,
  control: unknown,
  data: Record<string, unknown> | undefined
): boolean {
  let doRefresh = false
  let oldHasIcon: boolean | undefined
  let newHasIcon: boolean | undefined

  if (data !== undefined && data.icon !== undefined) {
    doRefresh = true
  } else {
    const multiIconControl = asDropdownRowControl(control).m_icon
    if (multiIconControl !== undefined) {
      oldHasIcon = multiIconControl.HasIcon()
      const newIconData = asLsmCastReadonlyUnknownUndefined(
        getValueOrCallback(data?.icon || undefined, data)
      )
      newHasIcon = (newIconData !== undefined && true) || false
      doRefresh = oldHasIcon !== newHasIcon
      if (!doRefresh && newIconData !== undefined) {
        doRefresh = multiIconControl.iconData.length !== newIconData.length
      }
    }
  }

  if (
    doRefresh === true ||
    (!doRefresh &&
      oldHasIcon !== undefined &&
      newHasIcon !== undefined &&
      oldHasIcon === false &&
      oldHasIcon === newHasIcon)
  ) {
    lib.FireCallbacks("IconUpdated", control, data)
    if (libDebug.doDebug) {
      dlog(libDebug.LSM_LOGTYPE_DEBUG_CALLBACK, 195, tos(getControlName(control)))
    }
  }
  return doRefresh
}

function checkFuncOnMouseUpRunHandler_NoCurrentMenuUpdate(
  this: void,
  _comboBox: unknown,
  control: unknown,
  _data: unknown,
  isRecursiveCall: unknown,
  ...args: unknown[]
): boolean {
  isRecursiveCall = isRecursiveCall || false

  const [LSM_menuRefreshVar] = select(1, ...args)
  const [entryControlUsedForOnMouseUpRunHandler] = select(2, ...args)
  if (!LSM_menuRefreshVar || entryControlUsedForOnMouseUpRunHandler === undefined) {
    return true
  } else if (
    LSM_menuRefreshVar !== undefined &&
    entryControlUsedForOnMouseUpRunHandler !== undefined
  ) {
    if (LSM_menuRefreshVar === LSM_normalMenuRefreshDone) {
      return asBoolean(isRecursiveCall)
    } else if (LSM_menuRefreshVar === LSM_submenuRefreshDone) {
      let allowRefresh = false
      allowRefresh = !isRecursiveCall
      if (!allowRefresh && control !== entryControlUsedForOnMouseUpRunHandler) {
        const owner = asLsmCastDropdownComboBoxUndefined(
          entryControlUsedForOnMouseUpRunHandler !== undefined &&
            asDropdownRowControl(entryControlUsedForOnMouseUpRunHandler).m_owner
        )
        if (owner !== undefined && owner.openingControl !== undefined) {
          allowRefresh = owner.openingControl !== control
        }
      }
      return allowRefresh
    }
  }
  return true
}
dropdownClassPrivate.checkFuncOnMouseUpRunHandler_NoCurrentMenuUpdate =
  checkFuncOnMouseUpRunHandler_NoCurrentMenuUpdate

function updateParentEntryRecursively(
  this: void,
  comboBox: unknown,
  control: unknown,
  checkFunc: unknown,
  ...args: unknown[]
): boolean {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 194)
  }

  const data = getControlData(control)

  let doRefresh = true
  if (type(checkFunc) === functionType) {
    doRefresh = asLsmCastThisVoidAUnknownBoolean(checkFunc)(comboBox, control, data, true, ...args)
  }

  if (doRefresh === true) {
    ZO_ScrollList_RefreshVisible(
      asControl(asDropdownObject(asDropdownRowControl(control).m_dropdownObject).scrollControl)
    )

    asDropdownObject(asDropdownRowControl(control).m_dropdownObject).SubmenuOrCurrentListRefresh(
      control,
      true
    )
  }

  const parent = data.m_parentControl
  if (parent) {
    updateParentEntryRecursively(comboBox, parent, checkFunc, ...args)
  }
  return doRefresh
}

function onEntryCallbackUpdateEntryPath(
  this: void,
  comboBox: unknown,
  control: unknown,
  data: Record<string, unknown> | undefined,
  checkFunc?: unknown,
  ...args: unknown[]
): unknown {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 196, tos(getControlName(control)))
  }
  if (comboBox === undefined || control === undefined) {
    return
  }
  if (data === undefined) {
    data = getControlData(control)
  }

  let doRefresh = true
  if (type(checkFunc) === functionType) {
    doRefresh = asLsmCastThisVoidAUnknownBoolean(checkFunc)(comboBox, control, data, false, ...args)
  }

  if (data !== undefined && doRefresh === true) {
    asDropdownObject(asDropdownRowControl(control).m_dropdownObject).Refresh(data)
  }

  const parent = asLsmCastRecordStringUnknown(data).m_parentControl
  if (parent) {
    updateParentEntryRecursively(comboBox, parent, checkFunc, ...args)
  }
  return doRefresh
}
UpdateCustomScrollableMenuEntryPath = asLsmCastThisVoidArgsUnknownUnknown(
  onEntryCallbackUpdateEntryPath
)

function onEntryCallbackUpdateIconsPath(
  this: void,
  comboBox: unknown,
  control: unknown,
  data?: Record<string, unknown>
): unknown {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 193, tos(getControlName(control)))
  }
  return onEntryCallbackUpdateEntryPath(comboBox, control, data, multiIconCheckFunc)
}
UpdateCustomScrollableMenuEntryIconPath = asLsmCastThisVoidArgsUnknownUnknown(
  onEntryCallbackUpdateIconsPath
)

const callbacksForRefresh = new LuaTable<object, unknown>()
callbacksForRefresh.set(asObject(updateEntryPathCheckFunc), onEntryCallbackUpdateEntryPath)
callbacksForRefresh.set(asObject(updateIconPath), onEntryCallbackUpdateIconsPath)

function checkIfEntryRaisesAutomaticUpdate(
  this: void,
  comboBox: unknown,
  control: unknown,
  data: Record<string, unknown> | undefined,
  checkFuncForRefresh: unknown,
  ...args: unknown[]
): unknown {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 197, tos(getControlName(checkFuncForRefresh)))
  }
  if (comboBox === undefined || control === undefined) {
    return
  }
  if (data === undefined) {
    data = getControlData(control)
  }
  if (data === undefined) {
    return false
  }

  for (const [, automaticUpdateData] of ipairs(allowedEntryDataAutomaticUpdateRaise)) {
    if (automaticUpdateData !== undefined) {
      const autoUpdateNow = getValueOrCallback(data[asString(automaticUpdateData)], data)
      if (autoUpdateNow !== undefined && autoUpdateNow === true) {
        const callbackFuncForRefresh = callbacksForRefresh.get(automaticUpdateData)
        if (type(callbackFuncForRefresh) === functionType) {
          if (automaticUpdateData === updateEntryPath) {
            const checkFuncForRefreshBackup = checkFuncForRefresh
            checkFuncForRefresh = data[asString(updateEntryPathCheckFunc)]
            if (checkFuncForRefresh === undefined) {
              checkFuncForRefresh = checkFuncForRefreshBackup
            } else {
            }
          }
          return asLsmCastThisVoidAUnknownUnknown(callbackFuncForRefresh)(
            comboBox,
            control,
            data,
            checkFuncForRefresh,
            ...args
          )
        }
      }
    }
  }
  return false
}
dropdownClassPrivate.checkIfEntryRaisesAutomaticUpdate =
  asLsmCastDropdownClassPrivateCheckIfEntryRaisesAutomati(checkIfEntryRaisesAutomaticUpdate)

dropdownClassPrivate.debugPrefix = debugPrefix
