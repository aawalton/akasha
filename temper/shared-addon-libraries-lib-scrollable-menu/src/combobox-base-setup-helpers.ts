import { asButtonGroupButton, asButtonGroupClass, asControl, asLsmCastButtonGroupButtonUndefined } from "./casts-1a"
import { asLsmCastRecordNumberButtonGroupObject, asLsmCastRecordNumberRecordNumberButtonGroupObject, asLsmCastRecordNumberString, asLsmCastRecordStringUnknown } from "./casts-2b"
import { asLsmCastSetSelectionChangedCallbackThisVoidCallbackUnk, asLsmCastThisVoidCheckButtonControlCheckedBooleanUndefi, asLsmCastThisVoidControlUnknownAlternativeControlUnknow } from "./casts-3a"
import { asLsmCastThisVoidControlUnknownDataUnknownUndefined, asLsmCastThisVoidLogTypeNumberMsgIdNumberArgsUnknownUnd } from "./casts-3b"
import { asLsmMultiIconControl, asLsmRowControl, asNumber, asString } from "./casts-4"

type LsmCastLocalColorWithUnpack = ColorWithUnpack
function asLsmCastLocalColorWithUnpack(value: unknown): LsmCastLocalColorWithUnpack {
  return value as LsmCastLocalColorWithUnpack
}

import { updateIcons } from "./combobox-base-icons"
import { getValueOrCallback } from "./constants-core"
import { lib } from "./lib-state"

const libDebug = lib.Debug
const dlog = asLsmCastThisVoidLogTypeNumberMsgIdNumberArgsUnknownUnd(libDebug.DebugLog)

const tos = tostring

const constants = lib.constants
const entryTypeConstants = asLsmCastRecordStringUnknown(constants.entryTypes)
const entryTypeToButtonChildName = asLsmCastRecordNumberString(
  entryTypeConstants.entryTypeToButtonChildName
)
const LSM_ENTRY_TYPE_CHECKBOX = asNumber(entryTypeConstants.LSM_ENTRY_TYPE_CHECKBOX)

const libUtil = lib.Util
const getControlName = asLsmCastThisVoidControlUnknownAlternativeControlUnknow(
  libUtil.getControlName
)
const subMenuArrowColor = asLsmCastThisVoidControlUnknownDataUnknownUndefined(
  libUtil.subMenuArrowColor
)

const classes = asLsmCastRecordStringUnknown(lib.classes)
const buttonGroupClass = asButtonGroupClass(classes.buttonGroupClass)

let buttonGroupDefaultContextMenu = lib.ButtonGroupDefaultContextMenu

interface ColorWithUnpack {
  UnpackRGBA: (this: unknown) => LuaMultiReturn<[number, number, number, number]>
}

export function applyEntryFont(
  this: void,
  control: LsmRowControl,
  font: unknown,
  color: unknown,
  horizontalAlignment: unknown
): undefined {
  if (libDebug.doDebug) {
    dlog(
      libDebug.LSM_LOGTYPE_VERBOSE,
      108,
      tos(getControlName(control)),
      tos(font),
      tos(color),
      tos(horizontalAlignment)
    )
  }
  const labelCtrl = asLsmRowControl(control.m_label)
  if (font) {
    labelCtrl.SetFont(asString(font))
  }

  if (color) {
    const [r, g, b, a] = asLsmCastLocalColorWithUnpack(color).UnpackRGBA()
    labelCtrl.SetColor(r, g, b, a)
  }

  if (horizontalAlignment) {
    labelCtrl.SetHorizontalAlignment(asNumber(horizontalAlignment))
  }
}

export function addIcon(
  this: void,
  control: LsmRowControl,
  data: Record<string, unknown>,
  list: unknown
): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 109, tos(getControlName(control)), tos(list))
  }
  control.m_iconContainer = control.m_iconContainer || control.GetNamedChild("IconContainer")
  const iconContainer = control.m_iconContainer
  control.m_icon = control.m_icon || asLsmMultiIconControl(iconContainer.GetNamedChild("Icon"))
  updateIcons(control, data)
  control.m_icon.closeOnSelect = false
}

export function addArrow(
  this: void,
  control: LsmRowControl,
  data: Record<string, unknown>,
  list: unknown
): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 110, tos(getControlName(control)), tos(list))
  }
  control.m_arrow = control.GetNamedChild("Arrow")
  subMenuArrowColor(control, data)
}

export function addDivider(
  this: void,
  control: LsmRowControl,
  _data: Record<string, unknown>,
  list: unknown
): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 111, tos(getControlName(control)), tos(list))
  }
  control.m_divider = control.GetNamedChild("Divider")
}

export function addLabel(
  this: void,
  control: LsmRowControl,
  data: Record<string, unknown>,
  list: unknown
): undefined {
  if (libDebug.doDebug) {
    dlog(libDebug.LSM_LOGTYPE_VERBOSE, 112, tos(getControlName(control)), tos(list))
  }
  control.m_label = control.m_label || control.GetNamedChild("Label")

  control.m_label.SetText(asString(data.label || data.name))
}

export function addCheckButton(
  this: void,
  comboBox: ComboBoxBase,
  control: LsmRowControl,
  data: Record<string, unknown>,
  toggleFunction: unknown
): LuaMultiReturn<[LsmRowControl | undefined, ButtonGroupObject | undefined]> {
  const entryType = control.typeId
  if (entryType === undefined) {
    return $multi(undefined, undefined)
  }
  const childName = entryTypeToButtonChildName[entryType]
  if (childName === undefined) {
    return $multi(undefined, undefined)
  }

  const buttonControl = control.m_button || control.GetNamedChild(childName)
  control.m_button = buttonControl
  buttonControl.entryType = entryType

  const isEnabled = data.enabled !== false
  buttonControl.SetMouseEnabled(isEnabled)
  buttonControl.enabled = isEnabled

  ZO_CheckButton_SetToggleFunction(
    asControl(buttonControl),
    asLsmCastThisVoidCheckButtonControlCheckedBooleanUndefi(toggleFunction)
  )

  let buttonGroup: ButtonGroupObject | undefined
  const groupIndex = getValueOrCallback(data.buttonGroup, data)

  if (type(groupIndex) === "number") {
    const mButtonGroup = asLsmCastRecordNumberRecordNumberButtonGroupObject(
      comboBox.m_buttonGroup || {}
    )
    comboBox.m_buttonGroup = asLsmCastRecordStringUnknown(mButtonGroup)
    mButtonGroup[entryType] = mButtonGroup[entryType] || asLsmCastRecordNumberButtonGroupObject({})
    const groupForType = asLsmCastRecordNumberButtonGroupObject(mButtonGroup[entryType])
    const resolvedGroup = groupForType[asNumber(groupIndex)] || buttonGroupClass.New()
    groupForType[asNumber(groupIndex)] = resolvedGroup
    buttonGroup = resolvedGroup

    if (type(data.buttonGroupOnSelectionChangedCallback) === "function") {
      asLsmCastSetSelectionChangedCallbackThisVoidCallbackUnk(
        buttonGroup
      ).SetSelectionChangedCallback(data.buttonGroupOnSelectionChangedCallback)
    }

    if (type(data.buttonGroupOnStateChangedCallback) === "function") {
      buttonGroup.SetStateChangedCallback(data.buttonGroupOnStateChangedCallback)
    }

    buttonControl.m_buttonGroup = buttonGroup
    buttonControl.m_buttonGroupIndex = groupIndex
    buttonGroup.Add(asButtonGroupButton(buttonControl), entryType)

    const IGNORECALLBACK = true
    buttonGroup.SetButtonState(
      asButtonGroupButton(buttonControl),
      asLsmCastButtonGroupButtonUndefined(data.clicked),
      isEnabled,
      IGNORECALLBACK
    )

    if (
      entryType === LSM_ENTRY_TYPE_CHECKBOX &&
      data.rightClickCallback === undefined &&
      data.contextMenuCallback === undefined
    ) {
      buttonGroupDefaultContextMenu =
        buttonGroupDefaultContextMenu ?? lib.ButtonGroupDefaultContextMenu
      data.rightClickCallback = buttonGroupDefaultContextMenu
    }
  }
  return $multi(buttonControl, buttonGroup)
}
