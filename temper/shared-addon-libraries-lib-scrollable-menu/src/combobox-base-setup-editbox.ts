import { asControl, asLsmCastBringWindowToTopThisUnknownUndefined } from "./casts-1a"
import { asLsmCastRecordStringUnknown } from "./casts-2b"
import { asLsmCastThisVoidArgsUnknownUndefined } from "./casts-3a"
import { asLsmCastThisVoidControlUnknownRecordStringUnknown, asLsmCastThisVoidEditBoxUnknownUndefined } from "./casts-3b"
import {
  asLsmCastThisVoidSliderCtrlUnknownUndefined,
  asLsmRowControl,
  asNumber,
  asString,
} from "./casts-4"

import { getValueOrCallback } from "./constants-core"
import { lib } from "./lib-state"

const tos = tostring
const strfor = string.format

const editBoxCtrlsContextmenuRegistered = new LuaTable<LsmRowControl, boolean>()
const sliderCtrlsContextmenuRegistered = new LuaTable<LsmRowControl, boolean>()

const libUtil = lib.Util
const getControlData = asLsmCastThisVoidControlUnknownRecordStringUnknown(libUtil.getControlData)

const currentMinMaxStepText = GetString(SI_LSM_SLIDER_CURRENT_MIN_MAX_STEP)

function reAnchorEditBoxControlsInRow(this: void, control: LsmRowControl): undefined {
  const editBoxData = control.editBoxData
  if (type(editBoxData) !== "table") {
    return
  }
  const editBoxDataTbl = asLsmCastRecordStringUnknown(editBoxData)

  const parentCtrl = control.GetParent()
  const labelCtrl = asLsmRowControl(control.m_label)
  const editCtrl = control.GetNamedChild("Edit")
  const editBoxCtrl = editCtrl.GetNamedChild("Box")

  const hideLabel = getValueOrCallback(editBoxDataTbl.hideLabel, editBoxDataTbl)
  if (hideLabel) {
    const currentLabelHeight = labelCtrl.GetHeight()
    labelCtrl.SetDimensionConstraints(0, currentLabelHeight, 0, currentLabelHeight)
    labelCtrl.SetDimensions(0, currentLabelHeight)
    labelCtrl.SetText("")
    labelCtrl.SetHidden(true)
  }
  if (!hideLabel) {
    let labelWidth = getValueOrCallback(editBoxDataTbl.labelWidth, editBoxDataTbl)
    if (labelWidth !== undefined) {
      if (type(labelWidth) === "number" && asNumber(labelWidth) <= 0) {
        labelWidth = 5
      }
      labelCtrl.SetWidth(asNumber(labelWidth))
    }
  }

  let widthOrHeightChanged = false
  let width = control.GetWidth()
  if (width === undefined || width <= 0) {
    width = parentCtrl.GetWidth()
  }
  let height = control.GetHeight()
  if (height === undefined || height <= 0) {
    height = editBoxCtrl.GetHeight()
  }
  if (height === undefined || height <= 0) {
    height = ZO_COMBO_BOX_ENTRY_TEMPLATE_HEIGHT
  }

  const editBoxWidth = getValueOrCallback(editBoxDataTbl.width, editBoxDataTbl)
  if (editBoxWidth !== undefined) {
    if (type(editBoxWidth) === "number") {
      width = zo_clamp(asNumber(editBoxWidth), 5, width)
    } else {
      width = asNumber(editBoxWidth)
    }
    widthOrHeightChanged = true
  }
  const editBoxHeight = getValueOrCallback(editBoxDataTbl.height, editBoxDataTbl)
  if (editBoxHeight !== undefined) {
    if (type(editBoxHeight) === "number") {
      height = zo_clamp(asNumber(editBoxHeight), 5, height)
    } else {
      height = asNumber(editBoxHeight)
    }
    widthOrHeightChanged = true
  }

  const offsetX = hideLabel === true ? 0 : 4
  if (widthOrHeightChanged) {
    editCtrl.ClearAnchors()
    editCtrl.SetDimensionConstraints(0, 0, width, height)
    editCtrl.SetAnchor(TOPLEFT, labelCtrl, TOPRIGHT, offsetX)
    editCtrl.SetAnchor(BOTTOMLEFT, labelCtrl, BOTTOMRIGHT, offsetX)
    editCtrl.SetDimensions(width, height)
  } else {
    editCtrl.ClearAnchors()
    editCtrl.SetAnchor(TOPLEFT, labelCtrl, TOPRIGHT, offsetX)
    editCtrl.SetAnchor(BOTTOMRIGHT, control, BOTTOMRIGHT, -5)
  }
}

function updateEditBoxText(
  this: void,
  control: LsmRowControl,
  editBoxData: Record<string, unknown> | undefined,
  editBoxCtrl: LsmRowControl | undefined
): undefined {
  editBoxData = editBoxData || asLsmCastRecordStringUnknown(control.editBoxData)

  const editCtrl = control.GetNamedChild("Edit")
  editBoxCtrl = editBoxCtrl || editCtrl.GetNamedChild("Box")

  const editBoxText = getValueOrCallback(editBoxData.text, editBoxData)
  if (editBoxText !== undefined) {
    editBoxCtrl.SetText(asString(editBoxText))
  }

  const editBoxFont = getValueOrCallback(editBoxData.font, editBoxData) || "ZoFontEdit"
  if (editBoxFont) {
    editBoxCtrl.SetFont(asString(editBoxFont))
  }

  let editBoxDefaultText = getValueOrCallback(editBoxData.defaultText, editBoxData)
  editBoxDefaultText = editBoxDefaultText || ""
  if (editBoxDefaultText !== undefined) {
    editBoxCtrl.SetDefaultText(asString(editBoxDefaultText))
  }

  const textType = getValueOrCallback(editBoxData.textType, editBoxData)
  if (textType !== undefined && type(textType) === "number") {
    editBoxCtrl.SetTextType(asNumber(textType))
  } else {
    editBoxCtrl.SetTextType(TEXT_TYPE_ALL)
  }

  const maxInputCharacters = getValueOrCallback(editBoxData.maxInputCharacters, editBoxData)
  if (
    maxInputCharacters !== undefined &&
    type(maxInputCharacters) === "number" &&
    asNumber(maxInputCharacters) >= 0
  ) {
    editBoxCtrl.SetMaxInputChars(asNumber(maxInputCharacters))
  } else {
    editBoxCtrl.SetMaxInputChars(MAX_TEXT_CHAT_INPUT_CHARACTERS)
  }
}

export function processEditBoxData(this: void, control: LsmRowControl): undefined {
  const editBoxData = control.editBoxData
  if (type(editBoxData) !== "table") {
    return
  }
  const editBoxDataTbl = asLsmCastRecordStringUnknown(editBoxData)

  const labelCtrl = asLsmRowControl(control.m_label)
  const editCtrl = control.GetNamedChild("Edit")
  const editBoxCtrl = editCtrl.GetNamedChild("Box")
  editBoxCtrl.rowControl = control

  updateEditBoxText(control, editBoxDataTbl, editBoxCtrl)

  labelCtrl.SetMouseEnabled(false)
  const contextMenuCallback = editBoxDataTbl.contextMenuCallback
  if (type(contextMenuCallback) === "function") {
    const showEditBoxContextMenu = function (this: void, p_editBox: unknown): undefined {
      ZO_Tooltips_HideTextTooltip()
      asLsmCastThisVoidEditBoxUnknownUndefined(contextMenuCallback)(p_editBox)
    }

    editBoxCtrl.SetMouseEnabled(true)
    editBoxCtrl.SetHandler("OnMouseUp", undefined)
    editBoxCtrl.SetHandler(
      "OnMouseUp",
      function (this: void, p_editBox: unknown, button: number, upInside: boolean): undefined {
        if (button === MOUSE_BUTTON_INDEX_RIGHT && upInside) {
          showEditBoxContextMenu(p_editBox)
        }
      }
    )

    labelCtrl.SetMouseEnabled(true)
    if (!editBoxCtrlsContextmenuRegistered.get(editBoxCtrl)) {
      editBoxCtrlsContextmenuRegistered.set(editBoxCtrl, true)
      labelCtrl.SetHandler(
        "OnMouseUp",
        function (this: void, p_editBox: unknown, button: number, upInside: boolean): undefined {
          if (!upInside) {
            return
          }
          if (button === MOUSE_BUTTON_INDEX_RIGHT) {
            showEditBoxContextMenu(p_editBox)
          }
        }
      )
    }
  }

  zo_callLater(function (this: void): undefined {
    reAnchorEditBoxControlsInRow(control)
  }, 0)
}

