import { asComboBoxBaseClass, asLsmCastBooleanUndefined } from "./casts-1a"
import { asLsmCastIsMouseOverControlThisVoidBoolean } from "./casts-2a"
import { asLsmCastRecordStringUnknown, asLsmCastRecordStringUnknownUndefined } from "./casts-2b"
import { asLsmCastThisVoidArgsUnknownLuaMultiReturnUnknownUnknow, asLsmCastThisVoidControlUnknownAlternativeControlUnknow } from "./casts-3a"
import { asLsmCastThisVoidLogTypeNumberMsgIdNumberArgsUnknownUnd, asLsmCastThisVoidLuaMultiReturnUnknown } from "./casts-3b"
import { asString } from "./casts-4"

import {
  isAccessibilityUIReaderEnabled,
  narrationEventToLibraryNarrateFunction,
} from "./combobox-base"
import { lib } from "./lib-state"

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
    const narrateFuncOfLibrary = narrationEventToLibraryNarrateFunction[asString(eventName)]
    if (narrateFuncOfLibrary === undefined) {
      return
    }
    narrateFuncOfLibrary(asString(narrateText), asLsmCastBooleanUndefined(stopCurrent))
  }
}
