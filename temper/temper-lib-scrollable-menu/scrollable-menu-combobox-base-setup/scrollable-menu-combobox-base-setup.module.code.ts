import {
  asBoolean,
  asComboBoxBaseClass,
  asControl,
} from "../scrollable-menu-casts-1a/scrollable-menu-casts-1a.module.code.ts"
import { asLsmCastFireCallbacksThisUnknownNameStringArgsUnknownUnde } from "../scrollable-menu-casts-1b/scrollable-menu-casts-1b.module.code.ts"
import {
  asLsmCastRecordStringUnknown,
  asLsmCastRecordStringUnknownUndefined,
} from "../scrollable-menu-casts-2b/scrollable-menu-casts-2b.module.code.ts"
import { asLsmCastThisVoidControlUnknownAlternativeControlUnknow } from "../scrollable-menu-casts-3a/scrollable-menu-casts-3a.module.code.ts"
import {
  asLsmCastThisVoidControlUnknownDataUnknownRecordStringU,
  asLsmCastThisVoidControlUnknownRecordStringUnknown,
  asLsmCastThisVoidControlUnknownUndefined,
  asLsmCastThisVoidLogTypeNumberMsgIdNumberArgsUnknownUnd,
} from "../scrollable-menu-casts-3b/scrollable-menu-casts-3b.module.code.ts"
import {
  asLsmRowControl,
  asNumber,
  asString,
} from "../scrollable-menu-casts-4/scrollable-menu-casts-4.module.code.ts"

type LsmCastLocalDropdownSetupEntryBase = DropdownSetupEntryBase
function asLsmCastLocalDropdownSetupEntryBase(value: unknown): LsmCastLocalDropdownSetupEntryBase {
  return value as LsmCastLocalDropdownSetupEntryBase
}

type LsmCastLocalButtonGroupSetClicked = ButtonGroupSetClicked
function asLsmCastLocalButtonGroupSetClicked(value: unknown): LsmCastLocalButtonGroupSetClicked {
  return value as LsmCastLocalButtonGroupSetClicked
}

import { processEditBoxData } from "../scrollable-menu-combobox-base-setup-editbox/scrollable-menu-combobox-base-setup-editbox.module.code.ts"
import {
  addArrow,
  addCheckButton,
  addDivider,
  addIcon,
  addLabel,
  applyEntryFont,
} from "../scrollable-menu-combobox-base-setup-helpers/scrollable-menu-combobox-base-setup-helpers.module.code.ts"
import { processSliderData } from "../scrollable-menu-combobox-base-setup-slider/scrollable-menu-combobox-base-setup-slider.module.code.ts"
import { getValueOrCallback } from "../scrollable-menu-constants-core/scrollable-menu-constants-core.module.code.ts"
import { lib } from "../scrollable-menu-lib-state/scrollable-menu-lib-state.module.code.ts"

const libDebug = lib.Debug
const dlog = asLsmCastThisVoidLogTypeNumberMsgIdNumberArgsUnknownUnd(libDebug.DebugLog)

const tos = tostring

const constants = lib.constants
const entryTypeConstants = asLsmCastRecordStringUnknown(constants.entryTypes)
const LSM_ENTRY_TYPE_NORMAL = asNumber(entryTypeConstants.LSM_ENTRY_TYPE_NORMAL)
const LSM_ENTRY_TYPE_DIVIDER = asNumber(entryTypeConstants.LSM_ENTRY_TYPE_DIVIDER)
const LSM_ENTRY_TYPE_HEADER = asNumber(entryTypeConstants.LSM_ENTRY_TYPE_HEADER)
const LSM_ENTRY_TYPE_SUBMENU = asNumber(entryTypeConstants.LSM_ENTRY_TYPE_SUBMENU)
const LSM_ENTRY_TYPE_RADIOBUTTON = asNumber(entryTypeConstants.LSM_ENTRY_TYPE_RADIOBUTTON)
const LSM_ENTRY_TYPE_CHECKBOX = asNumber(entryTypeConstants.LSM_ENTRY_TYPE_CHECKBOX)
const LSM_ENTRY_TYPE_BUTTON = asNumber(entryTypeConstants.LSM_ENTRY_TYPE_BUTTON)
const LSM_ENTRY_TYPE_EDITBOX = asNumber(entryTypeConstants.LSM_ENTRY_TYPE_EDITBOX)
const LSM_ENTRY_TYPE_SLIDER = asNumber(entryTypeConstants.LSM_ENTRY_TYPE_SLIDER)

const libUtil = lib.Util
const getControlName = asLsmCastThisVoidControlUnknownAlternativeControlUnknow(
  libUtil.getControlName
)
const getControlData = asLsmCastThisVoidControlUnknownRecordStringUnknown(libUtil.getControlData)
const hideTooltip = asLsmCastThisVoidControlUnknownUndefined(libUtil.hideTooltip)
const getEditBoxData = asLsmCastThisVoidControlUnknownDataUnknownRecordStringU(
  libUtil.getEditBoxData
)
const getSliderData = asLsmCastThisVoidControlUnknownDataUnknownRecordStringU(libUtil.getSliderData)

const classes = asLsmCastRecordStringUnknown(lib.classes)
const comboBox_base = asComboBoxBaseClass(classes.comboboxBaseClass)

interface ButtonGroupSetClicked {
  SetClickedButton: (this: void, button: unknown, ignoreCallback: unknown) => undefined
}

interface DropdownSetupEntryBase {
  SetupEntryBase: (this: void, control: unknown, data: unknown, list: unknown) => undefined
}

comboBox_base.SetupEntryBase = function (
  this: ComboBoxBase,
  control: Control,
  data: LsmEntry,
  list: unknown
): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 104, tos(getControlName(control)))
  }
  const ctrl = asLsmRowControl(control)
  const dataTbl = asLsmCastRecordStringUnknown(data)
  asLsmCastLocalDropdownSetupEntryBase(this.m_dropdownObject).SetupEntryBase(control, data, list)

  ctrl.callback = dataTbl.callback
  ctrl.contextMenuCallback = dataTbl.contextMenuCallback

  let closeOnSelect: unknown = (ctrl.selectable && type(dataTbl.callback) === "function") || false
  if (closeOnSelect === true) {
    const additionalData = asLsmCastRecordStringUnknownUndefined(dataTbl.additionalData)
    if (additionalData !== undefined) {
      closeOnSelect = getValueOrCallback(additionalData.closeOnSelect, additionalData)
    }
  }
  ctrl.closeOnSelect = closeOnSelect

  let isEnabled = dataTbl.enabled
  if (isEnabled === undefined) {
    isEnabled = true
  }
  ctrl.SetMouseEnabled(asBoolean(isEnabled))
}

comboBox_base.SetupEntryLabelBase = function (
  this: ComboBoxBase,
  control: Control,
  data: LsmEntry,
  list: unknown
): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 114, tos(getControlName(control)), tos(list))
  }
  const ctrl = asLsmRowControl(control)
  const dataTbl = asLsmCastRecordStringUnknown(data)
  let font = getValueOrCallback(dataTbl.font, dataTbl)
  font = font || this.GetDropdownFont()

  let color = getValueOrCallback(dataTbl.color, dataTbl)
  color = color || this.GetItemNormalColor(data)

  let horizontalAlignment = getValueOrCallback(dataTbl.horizontalAlignment, dataTbl)
  horizontalAlignment = horizontalAlignment || this.horizontalAlignment

  applyEntryFont(ctrl, font, color, horizontalAlignment)
  this.SetupEntryBase(control, data, list)
}

comboBox_base.SetupEntryLabel = function (
  this: ComboBoxBase,
  control: Control,
  data: LsmEntry,
  list: unknown,
  realEntryType?: number
): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 115, tos(getControlName(control)), tos(list))
  }
  const ctrl = asLsmRowControl(control)
  const dataTbl = asLsmCastRecordStringUnknown(data)
  ctrl.typeId = LSM_ENTRY_TYPE_NORMAL
  addIcon(ctrl, dataTbl, list)
  addLabel(ctrl, dataTbl, list)
  this.SetupEntryLabelBase(control, data, list)

  if (realEntryType === LSM_ENTRY_TYPE_NORMAL) {
    this.UpdateHighlightTemplate(control, data, undefined, undefined)
  }
}

comboBox_base.SetupEntryDivider = function (
  this: ComboBoxBase,
  control: Control,
  data: LsmEntry,
  list: unknown
): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 113, tos(getControlName(control)), tos(list))
  }
  const ctrl = asLsmRowControl(control)
  ctrl.typeId = LSM_ENTRY_TYPE_DIVIDER
  addDivider(ctrl, asLsmCastRecordStringUnknown(data), list)
  this.SetupEntryBase(control, data, list)
  ctrl.isDivider = true
}

comboBox_base.SetupEntryHeader = function (
  this: ComboBoxBase,
  control: Control,
  data: LsmEntry,
  list: unknown
): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 117, tos(getControlName(control)), tos(list))
  }
  const ctrl = asLsmRowControl(control)
  addDivider(ctrl, asLsmCastRecordStringUnknown(data), list)
  this.SetupEntryLabel(control, data, list)
  ctrl.isHeader = true
  ctrl.typeId = LSM_ENTRY_TYPE_HEADER
}

comboBox_base.SetupEntrySubmenu = function (
  this: ComboBoxBase,
  control: Control,
  data: LsmEntry,
  list: unknown
): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 116, tos(getControlName(control)), tos(list))
  }
  const ctrl = asLsmRowControl(control)
  const dataTbl = asLsmCastRecordStringUnknown(data)
  this.SetupEntryLabel(control, data, list)
  ctrl.typeId = LSM_ENTRY_TYPE_SUBMENU
  dataTbl.hasSubmenu = true
  addArrow(ctrl, dataTbl, list)

  this.UpdateHighlightTemplate(control, data, true, undefined)
}

comboBox_base.SetupEntryRadioButton = function (
  this: ComboBoxBase,
  control: Control,
  data: LsmEntry,
  list: unknown
): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 118, tos(getControlName(control)), tos(list))
  }
  const ctrl = asLsmRowControl(control)
  const dataTbl = asLsmCastRecordStringUnknown(data)

  const selfVar = this
  const toggleFunction = function (this: void, button: LsmRowControl, checked: boolean): undefined {
    const rowData = getControlData(button.GetParent())
    rowData.checked = checked

    if (checked) {
      if (libDebug.doDebug) {
        dlog(
          libDebug.LSM_LOGTYPE_VERBOSE,
          119,
          tos(getControlName(control)),
          tos(checked),
          tos(list)
        )
      }
      selfVar.RunItemCallback(data, dataTbl.ignoreCallback, checked)

      asLsmCastFireCallbacksThisUnknownNameStringArgsUnknownUnde(lib).FireCallbacks(
        "RadioButtonUpdated",
        control,
        data,
        checked
      )
      selfVar.Narrate("OnRadioButtonUpdated", asControl(button), data, undefined)
      if (libDebug.doDebug) {
        dlog(libDebug.LSM_LOGTYPE_DEBUG_CALLBACK, 120, tos(getControlName(button)), tos(checked))
      }
    }
  }
  this.SetupEntryLabel(control, data, list)
  ctrl.isRadioButton = true
  ctrl.typeId = LSM_ENTRY_TYPE_RADIOBUTTON

  this.UpdateHighlightTemplate(control, data, undefined, undefined)

  const [radioButton, radioButtonGroup] = addCheckButton(this, ctrl, dataTbl, toggleFunction)
  if (radioButtonGroup) {
    if (dataTbl.checked === true) {
      const ignoreCallback = true
      asLsmCastLocalButtonGroupSetClicked(radioButtonGroup).SetClickedButton(
        radioButton,
        ignoreCallback
      )
    }
  }
}

comboBox_base.SetupEntryCheckbox = function (
  this: ComboBoxBase,
  control: Control,
  data: LsmEntry,
  list: unknown
): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 121, tos(getControlName(control)), tos(list))
  }
  const ctrl = asLsmRowControl(control)
  const dataTbl = asLsmCastRecordStringUnknown(data)

  const selfVar = this
  const toggleFunction = function (
    this: void,
    checkbox: LsmRowControl,
    checked: boolean
  ): undefined {
    const checkedData = getControlData(checkbox.GetParent())

    checkedData.checked = checked

    if (libDebug.doDebug) {
      dlog(libDebug.LSM_LOGTYPE_VERBOSE, 122, tos(getControlName(control)), tos(checked), tos(list))
    }
    selfVar.RunItemCallback(data, dataTbl.ignoreCallback, checked)

    asLsmCastFireCallbacksThisUnknownNameStringArgsUnknownUnde(lib).FireCallbacks(
      "CheckboxUpdated",
      control,
      data,
      checked
    )
    selfVar.Narrate("OnCheckboxUpdated", asControl(checkbox), data, undefined)
    if (libDebug.doDebug) {
      dlog(libDebug.LSM_LOGTYPE_DEBUG_CALLBACK, 123, tos(getControlName(checkbox)), tos(checked))
    }

    hideTooltip(control)
  }

  this.SetupEntryLabel(control, data, list)
  ctrl.isCheckbox = true
  ctrl.typeId = LSM_ENTRY_TYPE_CHECKBOX

  this.UpdateHighlightTemplate(control, data, undefined, undefined)

  const [checkbox] = addCheckButton(this, ctrl, dataTbl, toggleFunction)
  ZO_CheckButton_SetCheckState(
    asControl(checkbox),
    asBoolean(getValueOrCallback(dataTbl.checked, dataTbl))
  )
}

comboBox_base.SetupEntryButton = function (
  this: ComboBoxBase,
  control: Control,
  data: LsmEntry,
  list: unknown
): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 124, tos(getControlName(control)), tos(list))
  }
  const ctrl = asLsmRowControl(control)
  const dataTbl = asLsmCastRecordStringUnknown(data)

  ctrl.isButton = true
  ctrl.typeId = LSM_ENTRY_TYPE_BUTTON
  addIcon(ctrl, dataTbl, list)
  addLabel(ctrl, dataTbl, list)

  let font = getValueOrCallback(dataTbl.font, dataTbl)
  font = font || this.GetDropdownFont()

  let color = getValueOrCallback(dataTbl.color, dataTbl)
  color = color || this.GetItemNormalColor(data)

  let horizontalAlignment = getValueOrCallback(dataTbl.horizontalAlignment, dataTbl)
  horizontalAlignment = horizontalAlignment || TEXT_ALIGN_CENTER

  applyEntryFont(ctrl, font, color, horizontalAlignment)
  this.SetupEntryBase(control, data, list)

  ctrl.SetEnabled(dataTbl.enabled)

  if (dataTbl.buttonTemplate) {
    ApplyTemplateToControl(control, asString(dataTbl.buttonTemplate))
  }

  this.UpdateHighlightTemplate(control, data, undefined, undefined)
}

comboBox_base.SetupEntryEditBox = function (
  this: ComboBoxBase,
  control: Control,
  data: LsmEntry,
  list: unknown
): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 187, tos(getControlName(control)), tos(list))
  }
  const ctrl = asLsmRowControl(control)
  const dataTbl = asLsmCastRecordStringUnknown(data)
  this.SetupEntryLabel(control, data, list)
  ctrl.isEditBox = true
  ctrl.typeId = LSM_ENTRY_TYPE_EDITBOX
  const editBoxCtrl = ctrl.GetNamedChild("EditBox")
  editBoxCtrl.callback = dataTbl.callback
  editBoxCtrl.isEditBox = true
  editBoxCtrl.closeOnSelect = false

  ctrl.closeOnSelect = false

  const editBoxData = getEditBoxData(ctrl, dataTbl)
  editBoxData._EditBoxCtrl = editBoxCtrl
  ctrl.editBoxData = editBoxData
  const editBoxTemplate = dataTbl.editBoxTemplate || editBoxData.editBoxTemplate
  if (editBoxTemplate) {
    ApplyTemplateToControl(control, asString(editBoxTemplate))
  }
  processEditBoxData(ctrl)

  let isEnabled = dataTbl.enabled
  if (isEnabled === undefined) {
    isEnabled = ctrl.IsEnabled()
  }
  editBoxCtrl.SetMouseEnabled(asBoolean(isEnabled))

  this.UpdateHighlightTemplate(control, data, undefined, undefined)
}

comboBox_base.SetupEntrySlider = function (
  this: ComboBoxBase,
  control: Control,
  data: LsmEntry,
  list: unknown
): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 190, tos(getControlName(control)), tos(list))
  }
  const ctrl = asLsmRowControl(control)
  const dataTbl = asLsmCastRecordStringUnknown(data)
  this.SetupEntryLabel(control, data, list)
  ctrl.isSlider = true
  ctrl.typeId = LSM_ENTRY_TYPE_SLIDER
  const sliderContainerCtrl = ctrl.GetNamedChild("SliderContainer")
  const sliderCtrl = sliderContainerCtrl.GetNamedChild("Slider")
  sliderCtrl.callback = dataTbl.callback
  sliderCtrl.isSlider = true
  sliderCtrl.closeOnSelect = false

  ctrl.closeOnSelect = false

  const sliderData = getSliderData(ctrl, dataTbl)
  sliderData._SliderCtrl = sliderCtrl
  ctrl.sliderData = sliderData
  const sliderTemplate = dataTbl.sliderTemplate || sliderData.sliderTemplate
  if (sliderTemplate) {
    ApplyTemplateToControl(control, asString(sliderTemplate))
  }
  processSliderData(ctrl)

  let isEnabled = dataTbl.enabled
  if (isEnabled === undefined) {
    isEnabled = ctrl.IsEnabled()
  }
  sliderCtrl.SetMouseEnabled(asBoolean(isEnabled))

  this.UpdateHighlightTemplate(control, data, undefined, undefined)
}
