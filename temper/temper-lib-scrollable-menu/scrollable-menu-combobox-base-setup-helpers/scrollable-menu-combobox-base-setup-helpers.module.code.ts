import {
  asButtonGroupButton,
  asButtonGroupClass,
  asControl,
  asLsmCastButtonGroupButtonUndefined,
} from "../scrollable-menu-casts-1a/scrollable-menu-casts-1a.module.code.ts"
import {
  asLsmCastRecordNumberButtonGroupObject,
  asLsmCastRecordNumberRecordNumberButtonGroupObject,
  asLsmCastRecordNumberString,
  asLsmCastRecordStringUnknown,
} from "../scrollable-menu-casts-2b/scrollable-menu-casts-2b.module.code.ts"
import {
  asLsmCastSetSelectionChangedCallbackThisVoidCallbackUnk,
  asLsmCastThisVoidCheckButtonControlCheckedBooleanUndefi,
  asLsmCastThisVoidControlUnknownAlternativeControlUnknow,
} from "../scrollable-menu-casts-3a/scrollable-menu-casts-3a.module.code.ts"
import {
  asLsmCastThisVoidControlUnknownDataUnknownUndefined,
  asLsmCastThisVoidLogTypeNumberMsgIdNumberArgsUnknownUnd,
} from "../scrollable-menu-casts-3b/scrollable-menu-casts-3b.module.code.ts"
import {
  asLsmMultiIconControl,
  asLsmRowControl,
  asNumber,
  asString,
} from "../scrollable-menu-casts-4/scrollable-menu-casts-4.module.code.ts"

type LsmCastLocalColorWithUnpack = ColorWithUnpack
function asLsmCastLocalColorWithUnpack(value: unknown): LsmCastLocalColorWithUnpack {
  return value as LsmCastLocalColorWithUnpack
}

import { updateIcons } from "../scrollable-menu-combobox-base-icons/scrollable-menu-combobox-base-icons.module.code.ts"
import { getValueOrCallback } from "../scrollable-menu-constants-core/scrollable-menu-constants-core.module.code.ts"
import { lib } from "../scrollable-menu-lib-state/scrollable-menu-lib-state.module.code.ts"

const libDebug = lib.Debug
const dlog = asLsmCastThisVoidLogTypeNumberMsgIdNumberArgsUnknownUnd(libDebug.DebugLog)

const tos = tostring

const constants = lib.constants
const entryTypeConstants = asLsmCastRecordStringUnknown(constants.entryTypes)
const ENTRY_TYPE_TO_BUTTON_CHILD_NAME = asLsmCastRecordNumberString(
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
  const childName = ENTRY_TYPE_TO_BUTTON_CHILD_NAME[entryType]
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

    const ignoreCallback = true
    buttonGroup.SetButtonState(
      asButtonGroupButton(buttonControl),
      asLsmCastButtonGroupButtonUndefined(data.clicked),
      isEnabled,
      ignoreCallback
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
