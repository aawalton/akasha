import { asLamControl, asThunk } from "../order-list-box-casts/order-list-box-casts.module.code.ts"
import {
  LAM_SORT_LIST_BOX_SCROLL_LIST_DATATYPE,
  SORT_LIST_ROW_DEFAULT_FONT,
  SORT_LIST_ROW_DEFAULT_HEIGHT,
  SORT_LIST_ROW_DEFAULT_MAXLINES,
  SORT_LIST_ROW_SELECTION_TEMPLATE_NAME,
  SORT_LIST_ROW_TEMPLATE_NAME,
} from "../order-list-box-constants/order-list-box-constants.module.code.ts"
import { abortDragging } from "../order-list-box-drag-cursor/order-list-box-drag-cursor.module.code.ts"
import { getDefaultValue, util } from "../order-list-box-state/order-list-box-state.module.code.ts"

export function getShowPositionInfoFromListBoxData(
  this: void,
  orderListBoxData: OrderListBoxData
): boolean {
  return orderListBoxData.showPosition !== undefined
    ? getDefaultValue(orderListBoxData.showPosition)
    : false
}

function resolveRowCallbackQuirk(this: void, value: unknown): undefined {
  if (value !== undefined) {
    asThunk<unknown>(value)()
  }
  return undefined
}

export function getRowInfoFromOrderListBoxData(
  this: void,
  orderListBoxData: OrderListBoxData
): LuaMultiReturn<
  [
    number,
    string,
    string,
    number,
    string,
    OrderListBox["rowSelectedCallback"],
    OrderListBox["rowHideCallback"],
    OrderListBox["dataTypeSelectSound"],
    OrderListBox["dataTypeResetControlCallback"],
  ]
> {
  const rowHeight =
    orderListBoxData.rowHeight !== undefined
      ? getDefaultValue(orderListBoxData.rowHeight)
      : SORT_LIST_ROW_DEFAULT_HEIGHT
  const rowTemplate =
    orderListBoxData.rowTemplate !== undefined
      ? getDefaultValue(orderListBoxData.rowTemplate)
      : SORT_LIST_ROW_TEMPLATE_NAME
  const rowFont =
    orderListBoxData.rowFont !== undefined
      ? getDefaultValue(orderListBoxData.rowFont)
      : SORT_LIST_ROW_DEFAULT_FONT
  const rowMaxLineCount =
    orderListBoxData.rowMaxLineCount !== undefined
      ? getDefaultValue(orderListBoxData.rowMaxLineCount)
      : SORT_LIST_ROW_DEFAULT_MAXLINES
  const rowSelectionTemplate =
    orderListBoxData.rowSelectionTemplate !== undefined
      ? getDefaultValue(orderListBoxData.rowSelectionTemplate)
      : SORT_LIST_ROW_SELECTION_TEMPLATE_NAME
  const rowSelectedCallback = resolveRowCallbackQuirk(orderListBoxData.rowSelectedCallback)
  const dataTypeSelectSound =
    orderListBoxData.dataTypeSelectSound !== undefined
      ? getDefaultValue(orderListBoxData.dataTypeSelectSound)
      : undefined
  const rowHideCallback = resolveRowCallbackQuirk(orderListBoxData.rowHideCallback)
  const dataTypeResetControlCallback = resolveRowCallbackQuirk(
    orderListBoxData.dataTypeResetControlCallback
  )
  return $multi(
    rowHeight,
    rowTemplate,
    rowFont,
    rowMaxLineCount,
    rowSelectionTemplate,
    rowSelectedCallback,
    rowHideCallback,
    dataTypeSelectSound,
    dataTypeResetControlCallback
  )
}

export function getShowValueInfoFromListBoxData(
  this: void,
  orderListBoxData: OrderListBoxData
): LuaMultiReturn<[boolean, boolean]> {
  const showValue =
    orderListBoxData.showValue !== undefined ? getDefaultValue(orderListBoxData.showValue) : false
  const showValueAtTooltip =
    orderListBoxData.showValueAtTooltip !== undefined
      ? getDefaultValue(orderListBoxData.showValueAtTooltip)
      : false
  return $multi(showValue, showValueAtTooltip)
}

export function getDisabledInfoFromListBoxData(
  this: void,
  orderListBoxData: OrderListBoxData
): LuaMultiReturn<[boolean, boolean]> {
  const disabledDrag =
    orderListBoxData.disableDrag !== undefined
      ? getDefaultValue(orderListBoxData.disableDrag)
      : false
  const disableButtons =
    orderListBoxData.disableButtons !== undefined
      ? getDefaultValue(orderListBoxData.disableButtons)
      : false
  return $multi(disabledDrag, disableButtons)
}

export function updateButtonsEnabledState(
  this: void,
  control: LamControl | undefined,
  areButtonsDisabled?: boolean,
  orderListBoxData?: OrderListBoxData,
  buttonMoveUpControl?: Control,
  buttonMoveDownControl?: Control,
  buttonMoveTotalUpControl?: Control,
  buttonMoveTotalDownControl?: Control
): undefined {
  if (control === undefined) {
    return
  }
  const orderListBox = control.orderListBox
  const data = orderListBoxData ?? orderListBox.orderListBoxData
  const upBtn = buttonMoveUpControl ?? orderListBox.moveUpButton
  const downBtn = buttonMoveDownControl ?? orderListBox.moveDownButton
  const totalUpBtn = buttonMoveTotalUpControl ?? orderListBox.moveTotalUpButton
  const totalDownBtn = buttonMoveTotalDownControl ?? orderListBox.moveTotalDownButton

  let disabled: boolean
  if (areButtonsDisabled !== undefined) {
    disabled = areButtonsDisabled
  } else {
    const [, second] = getDisabledInfoFromListBoxData(data)
    disabled = second
  }
  const mouseEnabled = !disabled

  upBtn.SetHidden(disabled)
  upBtn.SetMouseEnabled(mouseEnabled)
  downBtn.SetHidden(disabled)
  downBtn.SetMouseEnabled(mouseEnabled)
  totalUpBtn.SetHidden(disabled)
  totalUpBtn.SetMouseEnabled(mouseEnabled)
  totalDownBtn.SetHidden(disabled)
  totalDownBtn.SetMouseEnabled(mouseEnabled)
}

export function updateRemoveEntryEnabledState(this: void, control: LamControl): undefined {
  if (control.RemoveEntryButton === undefined) {
    return
  }
  control.RemoveEntryButton.SetMouseEnabled(
    ZO_ScrollList_GetSelectedDataIndex(control.orderListBox.scrollListControl) !== undefined
  )
}

export function updateDisabledStateOfControls(
  this: void,
  control: LamControl,
  disable: boolean
): undefined {
  const enabledState = !disable
  control.SetMouseEnabled(enabledState)
  const orderListBox = control.orderListBox
  const scrollList = control.orderListBox.scrollListControl

  scrollList.SetMouseEnabled(enabledState)

  orderListBox.disabled = disable
  let areButtonsDisabled = disable
  if (
    areButtonsDisabled === false &&
    (control.isBuilding === true || scrollList.selectedDataIndex === undefined)
  ) {
    areButtonsDisabled = true
  } else if (areButtonsDisabled === false) {
    areButtonsDisabled = orderListBox.areButtonsDisabled
  }
  if (control.AddNewValueButton !== undefined) {
    control.AddNewValueButton.SetMouseEnabled(enabledState)
  }
  updateRemoveEntryEnabledState(control)

  updateButtonsEnabledState(
    control,
    areButtonsDisabled,
    orderListBox.orderListBoxData,
    orderListBox.moveUpButton,
    orderListBox.moveDownButton,
    orderListBox.moveTotalUpButton,
    orderListBox.moveTotalDownButton
  )

  ZO_ScrollList_SetUseScrollbar(scrollList, enabledState)
  ZO_ScrollList_Commit(scrollList)
}

function updateOrderListBoxEntries(this: void, control: LamControl, value: ListEntry[]): undefined {
  const orderListBox = control.orderListBox
  orderListBox.orderListBoxData.listEntries = value
  orderListBox.masterList = orderListBox.Populate(orderListBox.orderListBoxData)
  orderListBox.UpdateScrollList(
    orderListBox.scrollListControl,
    orderListBox.masterList,
    LAM_SORT_LIST_BOX_SCROLL_LIST_DATATYPE,
    asLamControl(orderListBox)
  )

  updateRemoveEntryEnabledState(control)
}

export function updateValue(
  this: LamControl,
  forceDefault?: boolean,
  value?: ListEntry[]
): undefined {
  let requestRefresh = false
  let resolved = value
  if (forceDefault === true) {
    resolved = getDefaultValue(this.data.default ?? [])
    this.data.setFunc(resolved)
  } else if (resolved !== undefined) {
    this.data.setFunc(resolved)
    requestRefresh = true
  } else {
    resolved = this.data.getFunc()
  }
  updateOrderListBoxEntries(this, resolved)
  if (requestRefresh) {
    util.RequestRefreshIfNeeded(this)
  }
}

export function updateDisabled(this: LamControl): undefined {
  const dataDisabled = this.data.disabled
  const disable = dataDisabled !== undefined ? getDefaultValue(dataDisabled) : false
  const [r, g, b, a] = util.GetColorForState(disable).UnpackRGBA()
  this.label.SetColor(r, g, b, a)
  const orderListBox = this.orderListBox
  abortDragging(orderListBox)

  updateDisabledStateOfControls(this, disable)
}
