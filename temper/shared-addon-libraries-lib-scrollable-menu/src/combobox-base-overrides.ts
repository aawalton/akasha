import { asComboBoxBaseClass } from "./casts-1a"
import { asLsmCastRecordStringUnknown } from "./casts-2b"
import { asLsmCastThisVoidControlUnknownAlternativeControlUnknow } from "./casts-3a"
import { asLsmCastThisVoidLogTypeNumberMsgIdNumberArgsUnknownUnd } from "./casts-3b"
import { asNumber } from "./casts-4"

import { lib } from "./lib-state"

const libDebug = lib.Debug
const dlog = asLsmCastThisVoidLogTypeNumberMsgIdNumberArgsUnknownUnd(libDebug.DebugLog)

const classes = asLsmCastRecordStringUnknown(lib.classes)
const comboBox_base = asComboBoxBaseClass(classes.comboboxBaseClass)

const tos = tostring

const constants = lib.constants
const dropdownConstants = asLsmCastRecordStringUnknown(constants.dropdown)
const dropdownDefaults = asLsmCastRecordStringUnknown(dropdownConstants.defaults)
const MIN_WIDTH_WITHOUT_SEARCH_HEADER = asNumber(dropdownDefaults.MIN_WIDTH_WITHOUT_SEARCH_HEADER)

const libUtil = lib.Util
const getControlName = asLsmCastThisVoidControlUnknownAlternativeControlUnknow(
  libUtil.getControlName
)

comboBox_base.GetMaxRows = function (this: ComboBoxBase): number | undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 125)
  }
  return undefined
}

comboBox_base.UpdateOptions = function (
  this: ComboBoxBase,
  _options: LsmComboBoxOptions | undefined,
  _onInit?: unknown,
  _isContextMenu?: unknown,
  _initExistingComboBox?: unknown
): undefined {}

comboBox_base.SetFilterString = function (this: ComboBoxBase): undefined {}

comboBox_base.SetupDropdownHeader = function (this: ComboBoxBase): undefined {}

comboBox_base.UpdateDropdownHeader = function (this: ComboBoxBase): undefined {}

comboBox_base.SetMinMaxWidth = function (
  this: ComboBoxBase,
  minWidth: number,
  maxWidth: number
): undefined {
  this.containerMinWidth = minWidth
  this.m_containerWidth = maxWidth
}

comboBox_base.UpdateWidth = function (this: ComboBoxBase, control?: Control): undefined {
  const baseWidth = this.GetBaseWidth(control)

  const minDropdownWidth = this.GetMinDropdownWidth() ?? baseWidth
  let minWidth = minDropdownWidth > baseWidth ? minDropdownWidth : baseWidth
  if (minWidth <= 0) {
    minWidth = baseWidth
  }

  const maxDropdownWidth = this.GetMaxDropdownWidth()
  let maxWidthInTotal = maxDropdownWidth ?? asNumber(this.m_containerWidth)
  if (maxWidthInTotal <= 0) {
    maxWidthInTotal = MIN_WIDTH_WITHOUT_SEARCH_HEADER
  }

  let newWidth = maxWidthInTotal
  if (maxDropdownWidth !== undefined) {
    newWidth = zo_clamp(maxWidthInTotal, minWidth, maxDropdownWidth)
  } else {
    if (minWidth < maxWidthInTotal) {
      newWidth = zo_clamp(maxWidthInTotal, minWidth, maxWidthInTotal)
    } else {
      newWidth = minWidth
    }
  }

  if (libDebug.doDebug) {
    dlog(
      libDebug.LSM_LOGTYPE_VERBOSE,
      181,
      tos(getControlName(control)),
      tos(newWidth),
      tos(maxWidthInTotal),
      tos(maxDropdownWidth),
      tos(minWidth)
    )
  }

  this.SetMinMaxWidth(minWidth, newWidth)
}
