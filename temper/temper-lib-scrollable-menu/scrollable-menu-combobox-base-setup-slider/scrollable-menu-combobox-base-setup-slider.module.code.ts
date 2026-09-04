import {
  asControl,
  asLsmCastBringWindowToTopThisUnknownUndefined,
} from "../scrollable-menu-casts-1a/scrollable-menu-casts-1a.module.code.ts"
import { asLsmCastRecordStringUnknown } from "../scrollable-menu-casts-2b/scrollable-menu-casts-2b.module.code.ts"
import { asLsmCastThisVoidArgsUnknownUndefined } from "../scrollable-menu-casts-3a/scrollable-menu-casts-3a.module.code.ts"
import { asLsmCastThisVoidControlUnknownRecordStringUnknown } from "../scrollable-menu-casts-3b/scrollable-menu-casts-3b.module.code.ts"
import {
  asLsmCastThisVoidSliderCtrlUnknownUndefined,
  asLsmRowControl,
  asNumber,
  asString,
} from "../scrollable-menu-casts-4/scrollable-menu-casts-4.module.code.ts"

import { getValueOrCallback } from "../scrollable-menu-constants-core/scrollable-menu-constants-core.module.code.ts"
import { lib } from "../scrollable-menu-lib-state/scrollable-menu-lib-state.module.code.ts"

const tos = tostring
const strfor = string.format

const sliderCtrlsContextmenuRegistered = new LuaTable<LsmRowControl, boolean>()

const libUtil = lib.Util
const getControlData = asLsmCastThisVoidControlUnknownRecordStringUnknown(libUtil.getControlData)

const currentMinMaxStepText = GetString(SI_LSM_SLIDER_CURRENT_MIN_MAX_STEP)

function reAnchorSliderControlsInRow(this: void, control: LsmRowControl): undefined {
  const sliderData = control.sliderData
  if (type(sliderData) !== "table") {
    return
  }
  const sliderDataTbl = asLsmCastRecordStringUnknown(sliderData)
  const parentCtrl = control.GetParent()
  const labelCtrl = asLsmRowControl(control.m_label)
  const sliderContainerCtrl = control.GetNamedChild("SliderContainer")
  const sliderCtrl = sliderContainerCtrl.GetNamedChild("Slider")
  const sliderValueLabel = sliderContainerCtrl.GetNamedChild("SliderValueLabel")

  const hideLabel = getValueOrCallback(sliderDataTbl.hideLabel, sliderDataTbl)
  if (hideLabel) {
    const currentLabelHeight = labelCtrl.GetHeight()
    labelCtrl.SetDimensionConstraints(0, currentLabelHeight, 0, currentLabelHeight)
    labelCtrl.SetDimensions(0, currentLabelHeight)
    labelCtrl.SetText("")
    labelCtrl.SetHidden(true)
  }

  if (!hideLabel) {
    let labelWidth = getValueOrCallback(sliderDataTbl.labelWidth, sliderDataTbl)
    if (labelWidth !== undefined) {
      if (type(labelWidth) === "number" && asNumber(labelWidth) <= 0) {
        labelWidth = 5
      }
      labelCtrl.SetWidth(asNumber(labelWidth))
    }
  }

  const currentSliderContainerHeight = sliderContainerCtrl.GetHeight()
  const currentSliderContainerWidth = sliderContainerCtrl.GetWidth()

  const [, maxInit] = sliderCtrl.GetMinMax()
  let max = maxInit
  if (max <= 0) {
    max = 1
  }
  const sliderValueLabelMinWidth = zo_clamp(ZO_SCROLL_BAR_WIDTH + max * 2, 50, 100)
  let widthOrHeightChanged = false
  let width = currentSliderContainerWidth - sliderValueLabelMinWidth
  if (width === undefined || width <= 0) {
    width = parentCtrl.GetWidth() - sliderValueLabelMinWidth
  }
  if (width === undefined || width <= 0) {
    width = 20
  }
  let height = control.GetHeight()
  if (height === undefined || height <= 0) {
    height = sliderCtrl.GetHeight()
  }
  if (height === undefined || height <= 0) {
    height = 20
  }

  let showSliderValueLabel = getValueOrCallback(sliderDataTbl.showValueLabel, sliderDataTbl)
  showSliderValueLabel = showSliderValueLabel || false
  sliderValueLabel.SetHorizontalAlignment(TEXT_ALIGN_CENTER)
  sliderValueLabel.ClearAnchors()
  if (showSliderValueLabel === true) {
    sliderValueLabel.SetAnchor(LEFT, sliderCtrl, RIGHT, 2, -1)
    sliderValueLabel.SetAnchor(RIGHT, sliderContainerCtrl, RIGHT, -1)
    sliderValueLabel.SetDimensionConstraints(
      20,
      currentSliderContainerHeight,
      150,
      currentSliderContainerHeight
    )
    sliderValueLabel.SetText(tos(sliderCtrl.GetValue()))
  } else {
    sliderValueLabel.SetAnchor(RIGHT, sliderContainerCtrl, RIGHT, -1)
    sliderValueLabel.SetDimensionConstraints(
      0,
      currentSliderContainerHeight,
      0,
      currentSliderContainerHeight
    )
    sliderValueLabel.SetText("")
  }

  let valueLabelFont = getValueOrCallback(sliderDataTbl.valueLabelFont, sliderDataTbl)
  if (type(valueLabelFont) !== "string") {
    valueLabelFont = "ZoFontWinH5"
  }
  sliderValueLabel.SetFont(asString(valueLabelFont))

  const sliderWidth = getValueOrCallback(sliderDataTbl.width, sliderDataTbl)
  if (sliderWidth !== undefined) {
    if (type(sliderWidth) === "number") {
      width = zo_clamp(asNumber(sliderWidth), 5, width)
    } else {
      width = asNumber(sliderWidth)
    }
    widthOrHeightChanged = true
  }
  const sliderHeight = getValueOrCallback(sliderDataTbl.height, sliderDataTbl)
  if (sliderHeight !== undefined) {
    if (type(sliderHeight) === "number") {
      height = zo_clamp(asNumber(sliderHeight), 5, height)
    } else {
      height = asNumber(sliderHeight)
    }
    widthOrHeightChanged = true
  }

  if (!widthOrHeightChanged && showSliderValueLabel === false) {
    width = width + sliderValueLabelMinWidth
  }

  const offsetX = hideLabel === true ? 0 : 4
  sliderCtrl.ClearAnchors()
  sliderCtrl.SetAnchor(LEFT, labelCtrl, RIGHT, offsetX)
  if (widthOrHeightChanged === true) {
    sliderCtrl.SetDimensionConstraints(0, 0, width, height)
    sliderCtrl.SetDimensions(width, height)
  } else {
    sliderCtrl.SetDimensionConstraints(20, 5, width, height)
    sliderCtrl.SetDimensions(width, height)
  }
}

export function processSliderData(this: void, control: LsmRowControl): undefined {
  const sliderData = control.sliderData
  if (type(sliderData) !== "table") {
    return
  }
  const sliderDataTbl = asLsmCastRecordStringUnknown(sliderData)

  const labelCtrl = asLsmRowControl(control.m_label)
  const sliderContainerCtrl = control.GetNamedChild("SliderContainer")
  const sliderCtrl = sliderContainerCtrl.GetNamedChild("Slider")
  sliderCtrl.rowControl = control
  sliderCtrl.SetOrientation(ORIENTATION_HORIZONTAL)
  const sliderValueLabel = sliderContainerCtrl.GetNamedChild("SliderValueLabel")

  let showSliderValueLabel = getValueOrCallback(sliderDataTbl.showValueLabel, sliderDataTbl)
  showSliderValueLabel = showSliderValueLabel || false
  sliderValueLabel.SetHidden(!showSliderValueLabel)

  let hideSliderValueTooltip = getValueOrCallback(sliderDataTbl.hideValueTooltip, sliderDataTbl)
  hideSliderValueTooltip = hideSliderValueTooltip || false

  let minValue = getValueOrCallback(sliderDataTbl.min, sliderDataTbl)
  let maxValue = getValueOrCallback(sliderDataTbl.max, sliderDataTbl)
  minValue = minValue || 0
  maxValue = maxValue || 0
  sliderCtrl.SetMinMax(asNumber(minValue), asNumber(maxValue))

  let stepValue = getValueOrCallback(sliderDataTbl.step, sliderDataTbl)
  stepValue = stepValue || 0
  sliderCtrl.SetValueStep(asNumber(stepValue))

  const sliderValue = getValueOrCallback(sliderDataTbl.value, sliderDataTbl)
  if (sliderValue !== undefined) {
    sliderCtrl.SetValue(asNumber(sliderValue))
  }
  sliderValueLabel.SetText(sliderValue !== undefined ? tos(sliderValue) : "")

  sliderCtrl.SetMouseEnabled(true)
  sliderCtrl.SetHandler("OnMouseEnter", undefined)
  sliderCtrl.SetHandler("OnMouseExit", undefined)
  const sliderOnMouseEnter = function (this: void, pSliderCtrl: LsmRowControl): undefined {
    if (hideSliderValueTooltip === true) {
      return
    }

    let tooltipTextCurrentValue = tos(pSliderCtrl.GetValue())
    const [min, max] = pSliderCtrl.GetMinMax()
    const step = pSliderCtrl.GetValueStep()
    tooltipTextCurrentValue = strfor(
      currentMinMaxStepText,
      tooltipTextCurrentValue,
      tos(min),
      tos(max),
      tos(step)
    )

    const data = getControlData(pSliderCtrl.rowControl)
    const tooltipText = (data !== undefined && getValueOrCallback(data.tooltip, data)) || undefined
    if (tooltipText !== undefined && tooltipText !== "") {
      tooltipTextCurrentValue = tooltipTextCurrentValue + "\n" + asString(tooltipText)
    }
    ZO_Tooltips_ShowTextTooltip(asControl(pSliderCtrl.rowControl), TOP, tooltipTextCurrentValue)
    asLsmCastBringWindowToTopThisUnknownUndefined(InformationTooltipTopLevel).BringWindowToTop()
  }

  sliderCtrl.SetHandler("OnMouseEnter", sliderOnMouseEnter)
  sliderCtrl.SetHandler("OnMouseExit", function (this: void, _p_sliderCtrl: unknown): undefined {
    ZO_Tooltips_HideTextTooltip()
  })

  let contextMenuCallback = sliderDataTbl.contextMenuCallback
  if (type(contextMenuCallback) !== "function") {
    contextMenuCallback = undefined
  }

  const sliderGotContextMenu = contextMenuCallback !== undefined
  const showSliderContextMenu = function (this: void, pSliderCtrl: unknown): undefined {
    if (!sliderGotContextMenu) {
      return
    }
    ZO_Tooltips_HideTextTooltip()
    asLsmCastThisVoidSliderCtrlUnknownUndefined(contextMenuCallback)(pSliderCtrl)
  }
  labelCtrl.SetMouseEnabled(sliderGotContextMenu)
  sliderValueLabel.SetMouseEnabled(sliderGotContextMenu)
  if (sliderGotContextMenu === true && !sliderCtrlsContextmenuRegistered.get(sliderCtrl)) {
    sliderCtrlsContextmenuRegistered.set(sliderCtrl, true)
    labelCtrl.SetHandler(
      "OnMouseUp",
      function (this: void, pSliderCtrl: unknown, button: number, upInside: boolean): undefined {
        if (!upInside) {
          return
        }
        if (button === MOUSE_BUTTON_INDEX_RIGHT) {
          showSliderContextMenu(pSliderCtrl)
        }
      }
    )
    sliderValueLabel.SetHandler(
      "OnMouseUp",
      function (this: void, pSliderCtrl: unknown, button: number, upInside: boolean): undefined {
        if (!upInside) {
          return
        }
        if (button === MOUSE_BUTTON_INDEX_RIGHT) {
          showSliderContextMenu(pSliderCtrl)
        }
      }
    )
  }

  const onSliderMouseUp = function (
    this: void,
    pSliderCtrl: LsmRowControl,
    button: number,
    upInside: boolean
  ): undefined {
    if (!upInside) {
      return
    }
    if (button === MOUSE_BUTTON_INDEX_RIGHT) {
      showSliderContextMenu(pSliderCtrl)
    } else if (button === MOUSE_BUTTON_INDEX_LEFT) {
      sliderValueLabel.SetText(showSliderValueLabel === true ? tos(pSliderCtrl.GetValue()) : "")
      sliderOnMouseEnter(pSliderCtrl)
    }
  }

  if (!sliderCtrl.onMouseUpFunc) {
    const sliderOnMouseUpCallback = sliderCtrl.GetHandler("OnMouseUp")
    if (type(sliderOnMouseUpCallback) === "function") {
      ZO_PostHookHandler(
        asControl(sliderCtrl),
        "OnMouseUp",
        asLsmCastThisVoidArgsUnknownUndefined(onSliderMouseUp)
      )
    } else {
      sliderCtrl.SetHandler("OnMouseUp", onSliderMouseUp)
    }
    sliderCtrl.onMouseUpFunc = sliderCtrl.GetHandler("OnMouseUp")
  }

  zo_callLater(function (this: void): undefined {
    reAnchorSliderControlsInRow(control)
  }, 0)
}
