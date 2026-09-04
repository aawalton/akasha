import {
  asComboBoxBaseClass,
  asLsmCastBooleanUndefined,
} from "../scrollable-menu-casts-1a/scrollable-menu-casts-1a.module.code.ts"
import { asLsmCastIsMouseOverControlThisVoidBoolean } from "../scrollable-menu-casts-2a/scrollable-menu-casts-2a.module.code.ts"
import {
  asLsmCastRecordStringUnknown,
  asLsmCastRecordStringUnknownUndefined,
} from "../scrollable-menu-casts-2b/scrollable-menu-casts-2b.module.code.ts"
import {
  asLsmCastThisVoidArgsUnknownLuaMultiReturnUnknownUnknow,
  asLsmCastThisVoidControlUnknownAlternativeControlUnknow,
} from "../scrollable-menu-casts-3a/scrollable-menu-casts-3a.module.code.ts"
import {
  asLsmCastThisVoidLogTypeNumberMsgIdNumberArgsUnknownUnd,
  asLsmCastThisVoidLuaMultiReturnUnknown,
} from "../scrollable-menu-casts-3b/scrollable-menu-casts-3b.module.code.ts"
import { asString } from "../scrollable-menu-casts-4/scrollable-menu-casts-4.module.code.ts"

import {
  isAccessibilityUIReaderEnabled,
  NARRATION_EVENT_TO_LIBRARY_NARRATE_FUNCTION,
} from "../scrollable-menu-combobox-base/scrollable-menu-combobox-base.module.code.ts"
import { lib } from "../scrollable-menu-lib-state/scrollable-menu-lib-state.module.code.ts"

const libDebug = lib.Debug
const dlog = asLsmCastThisVoidLogTypeNumberMsgIdNumberArgsUnknownUnd(libDebug.DebugLog)

const tos = tostring

const getControlName = asLsmCastThisVoidControlUnknownAlternativeControlUnknow(
  lib.Util.getControlName
)

const classes = asLsmCastRecordStringUnknown(lib.classes)
const comboBox_base = asComboBoxBaseClass(classes.comboboxBaseClass)

comboBox_base.IsMouseOverControl = function (this: ComboBoxBase): boolean {
  const dropdownObject = asLsmCastIsMouseOverControlThisVoidBoolean(this.m_dropdownObject)
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 98, tos(dropdownObject.IsMouseOverControl()))
  }
  return dropdownObject.IsMouseOverControl()
}

comboBox_base.Narrate = function (
  this: ComboBoxBase,
  eventName: string | undefined,
  ctrl: unknown,
  data: unknown,
  hasSubmenu: unknown,
  anchorPoint: unknown
): undefined {
  if (libDebug.doDebug) {
    dlog(
      libDebug.LSM_LOGTYPE_VERBOSE,
      99,
      tos(eventName),
      tos(getControlName(ctrl)),
      tos(hasSubmenu),
      tos(anchorPoint)
    )
  }
  const narrateData = asLsmCastRecordStringUnknownUndefined(this.narrateData)
  if (
    eventName === undefined ||
    isAccessibilityUIReaderEnabled() === false ||
    narrateData === undefined
  ) {
    return
  }
  const narrateCallbackFuncForEvent = narrateData[eventName]
  if (
    narrateCallbackFuncForEvent === undefined ||
    type(narrateCallbackFuncForEvent) !== "function"
  ) {
    return
  }
  const selfVar = this

  const eventCallbackFunctionsSignatures: Record<
    string,
    (this: void) => LuaMultiReturn<unknown[]>
  > = {
    OnMenuShow: function (this: void): LuaMultiReturn<unknown[]> {
      return $multi(selfVar, ctrl)
    },
    OnMenuHide: function (this: void): LuaMultiReturn<unknown[]> {
      return $multi(selfVar, ctrl)
    },
    OnSubMenuShow: function (this: void): LuaMultiReturn<unknown[]> {
      return $multi(selfVar, ctrl, anchorPoint)
    },
    OnSubMenuHide: function (this: void): LuaMultiReturn<unknown[]> {
      return $multi(selfVar, ctrl)
    },
    OnEntrySelected: function (this: void): LuaMultiReturn<unknown[]> {
      return $multi(selfVar, ctrl, data, hasSubmenu)
    },
    OnEntryMouseExit: function (this: void): LuaMultiReturn<unknown[]> {
      return $multi(selfVar, ctrl, data, hasSubmenu)
    },
    OnEntryMouseEnter: function (this: void): LuaMultiReturn<unknown[]> {
      return $multi(selfVar, ctrl, data, hasSubmenu)
    },
    OnCheckboxUpdated: function (this: void): LuaMultiReturn<unknown[]> {
      return $multi(selfVar, ctrl, data)
    },
    OnRadioButtonUpdated: function (this: void): LuaMultiReturn<unknown[]> {
      return $multi(selfVar, ctrl, data)
    },
    OnComboBoxMouseExit: function (this: void): LuaMultiReturn<unknown[]> {
      return $multi(selfVar, ctrl)
    },
    OnComboBoxMouseEnter: function (this: void): LuaMultiReturn<unknown[]> {
      return $multi(selfVar, ctrl)
    },
  }
  if (eventCallbackFunctionsSignatures[eventName] === undefined) {
    return
  }
  const callbackParams = [
    ...asLsmCastThisVoidLuaMultiReturnUnknown(eventCallbackFunctionsSignatures[eventName])(),
  ]
  const [narrateText, stopCurrent] = asLsmCastThisVoidArgsUnknownLuaMultiReturnUnknownUnknow(
    narrateCallbackFuncForEvent
  )(...callbackParams)

  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 100, tos(narrateText), tos(stopCurrent))
  }
  if (type(narrateText) === "string") {
    const narrateFuncOfLibrary = NARRATION_EVENT_TO_LIBRARY_NARRATE_FUNCTION[asString(eventName)]
    if (narrateFuncOfLibrary === undefined) {
      return
    }
    narrateFuncOfLibrary(asString(narrateText), asLsmCastBooleanUndefined(stopCurrent))
  }
}
