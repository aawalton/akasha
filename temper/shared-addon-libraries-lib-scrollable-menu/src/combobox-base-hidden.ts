import { asComboBoxBaseClass, asLsmCastComboBoxBaseUndefined } from "./casts-1a"
import { asLsmCastIsHiddenThisUnknownBoolean, asLsmCastIsMouseOverControlThisVoidBoolean } from "./casts-2a"
import { asLsmCastRecordStringUnknown } from "./casts-2b"
import { asLsmCastThisVoidControlUnknownAlternativeControlUnknow } from "./casts-3a"
import { asLsmCastThisVoidLogTypeNumberMsgIdNumberArgsUnknownUnd } from "./casts-3b"

import { lib } from "./lib-state"

const libDebug = lib.Debug
const dlog = asLsmCastThisVoidLogTypeNumberMsgIdNumberArgsUnknownUnd(libDebug.DebugLog)

const tos = tostring

const getControlName = asLsmCastThisVoidControlUnknownAlternativeControlUnknow(
  lib.Util.getControlName
)

const classes = asLsmCastRecordStringUnknown(lib.classes)
const comboBox_base = asComboBoxBaseClass(classes.comboboxBaseClass)

comboBox_base.OnGlobalMouseUp = function (
  this: ComboBoxBase,
  _eventId: number,
  button: number
): boolean | undefined {
  if (libDebug.doDebug) {
    dlog(
      libDebug.LSM_LOGTYPE_VERBOSE,
      90,
      tos(button),
      tos(lib.preventerVars.suppressNextOnGlobalMouseUp)
    )
  }

  let abortEarly = false
  const suppressNextOnGlobalMouseUp = lib.preventerVars.suppressNextOnGlobalMouseUp
  const suppressNextOnGlobalMouseUpType =
    (suppressNextOnGlobalMouseUp !== undefined && type(suppressNextOnGlobalMouseUp)) || undefined
  if (suppressNextOnGlobalMouseUpType !== undefined) {
    if (suppressNextOnGlobalMouseUpType === "boolean" && suppressNextOnGlobalMouseUp === true) {
      abortEarly = true
    } else if (
      suppressNextOnGlobalMouseUpType === "number" &&
      suppressNextOnGlobalMouseUp === button
    ) {
      abortEarly = true
    }
  }
  if (abortEarly) {
    lib.preventerVars.suppressNextOnGlobalMouseUp = undefined
    return false
  }

  if (this.IsDropdownVisible()) {
    const dropdownObject = asLsmCastIsMouseOverControlThisVoidBoolean(this.m_dropdownObject)
    const isMouseOverOwningDropdown = dropdownObject.IsMouseOverControl()
    if (!isMouseOverOwningDropdown) {
      if (this.HiddenForReasons(button, isMouseOverOwningDropdown)) {
        return this.HideDropdown()
      }
    }
  } else {
    const container = asLsmCastIsHiddenThisUnknownBoolean(this.m_container)
    if (container.IsHidden()) {
      this.HideDropdown()
    } else {
      lib.openMenu = this
      this.ShowDropdownOnMouseUp()
    }
  }
  return undefined
}

comboBox_base.ShouldHideDropdown = function (this: ComboBoxBase): boolean {
  const submenu = asLsmCastComboBoxBaseUndefined(this.m_submenu)
  if (submenu?.ShouldHideDropdown()) {
    submenu.HideDropdown()
  }
  return this.IsDropdownVisible() && !this.IsMouseOverControl()
}
