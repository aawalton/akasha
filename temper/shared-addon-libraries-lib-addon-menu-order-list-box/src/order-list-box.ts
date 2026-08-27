import { asListEntry, asOrderListBox, asOrderRowControl, asOrderScrollList } from "./casts"
import {
  LAM_SORT_LIST_BOX_SCROLL_LIST_DATATYPE,
  SORT_LIST_ROW_DEFAULT_FONT,
  SORT_LIST_ROW_DEFAULT_HEIGHT,
  SORT_LIST_ROW_DEFAULT_MAXLINES,
  SORT_LIST_ROW_SELECTION_TEMPLATE_NAME,
  SORT_LIST_ROW_TEMPLATE_NAME,
} from "./constants"
import {
  getDisabledInfoFromListBoxData,
  getRowInfoFromOrderListBoxData,
  getShowPositionInfoFromListBoxData,
  getShowValueInfoFromListBoxData,
  updateButtonsEnabledState,
} from "./helpers"
import {
  DragOnUpdateCallback,
  OnGlobalMouseDownDuringDrag,
  OnGlobalMouseUpDuringDrag,
  StartDragging,
  StopDragging,
  UpdateCursorTLC,
} from "./methods-drag"
import {
  AddNewEntry,
  AddNewEntryFromDialog,
  RemoveSelectedEntry,
  RemoveValue,
  ShowAddNewEntryDialog,
  ShowAskBeforeRemoveEntryDialog,
} from "./methods-entries"
import {
  GetCurrentEntries,
  MoveItem,
  OnRowSelected,
  Populate,
  RowSetupFunction,
  UpdateMoveButtonsEnabledState,
  UpdateScrollList,
} from "./methods-list"
import { createMoveButtons } from "./move-buttons"
import { wm } from "./state"
import type { LamControl, OrderListBox, OrderListBoxData } from "./types"

export function createOrderListBox(
  this: void,
  panel: LamControl,
  control: LamControl,
  orderListBoxData: OrderListBoxData
): OrderListBox {
  const orderListBox: OrderListBox = asOrderListBox({
    panel,
    control,
    name: control.orderListBoxName,
    orderListBoxData,
    disabled: false,
    areButtonsDisabled: false,
    isDragDisabled: false,
    showPosition: false,
    showValue: false,
    showValueAtTooltip: false,
    rowHeight: SORT_LIST_ROW_DEFAULT_HEIGHT,
    rowTemplate: SORT_LIST_ROW_TEMPLATE_NAME,
    rowFont: SORT_LIST_ROW_DEFAULT_FONT,
    rowMaxLineCount: SORT_LIST_ROW_DEFAULT_MAXLINES,
    rowSelectionTemplate: SORT_LIST_ROW_SELECTION_TEMPLATE_NAME,
    rowSelectedCallback: undefined,
    rowHideCallback: undefined,
    dataTypeSelectSound: undefined,
    dataTypeResetControlCallback: undefined,
    Populate,
    UpdateScrollList,
    RowSetupFunction,
    OnRowSelected,
    MoveItem,
    UpdateMoveButtonsEnabledState,
    OnGlobalMouseDownDuringDrag,
    OnGlobalMouseUpDuringDrag,
    UpdateCursorTLC,
    DragOnUpdateCallback,
    StartDragging,
    StopDragging,
    GetCurrentEntries,
    RemoveValue,
    RemoveSelectedEntry,
    AddNewEntry,
    AddNewEntryFromDialog,
    ShowAddNewEntryDialog,
    ShowAskBeforeRemoveEntryDialog,
  })

  const controlContainer = control.container
  const controlName = control.GetName()

  const scrollListControl = asOrderScrollList(
    wm.CreateControlFromVirtual(controlName + "_OrderListBox", control, "ZO_ScrollList")
  )
  const controlHeight = control.GetHeight()
  const widthXMinus = orderListBoxData.width === "half" ? 16 : 12
  const width = controlContainer.GetWidth() - widthXMinus
  scrollListControl.SetDimensions(width, controlHeight)
  scrollListControl.SetAnchor(TOPLEFT, controlContainer, TOPLEFT)
  scrollListControl.SetAnchor(BOTTOMRIGHT, control, BOTTOMRIGHT, widthXMinus * -1, 0)
  scrollListControl.SetHidden(false)
  orderListBox.scrollListControl = scrollListControl

  const [
    buttonMoveUpControl,
    buttonMoveDownControl,
    buttonMoveTotalUpControl,
    buttonMoveTotalDownControl,
  ] = createMoveButtons(orderListBox, scrollListControl, controlName)
  orderListBox.moveUpButton = buttonMoveUpControl
  orderListBox.moveDownButton = buttonMoveDownControl
  orderListBox.moveTotalUpButton = buttonMoveTotalUpControl
  orderListBox.moveTotalDownButton = buttonMoveTotalDownControl

  const [dragDisabled, buttonsDisabled] = getDisabledInfoFromListBoxData(orderListBoxData)
  orderListBox.isDragDisabled = dragDisabled
  orderListBox.areButtonsDisabled = buttonsDisabled
  updateButtonsEnabledState(
    control,
    orderListBox.areButtonsDisabled,
    orderListBoxData,
    buttonMoveUpControl,
    buttonMoveDownControl,
    buttonMoveTotalUpControl,
    buttonMoveTotalDownControl
  )

  orderListBox.showPosition = getShowPositionInfoFromListBoxData(orderListBoxData)

  const dataTypeId = LAM_SORT_LIST_BOX_SCROLL_LIST_DATATYPE

  const [
    rowHeight,
    rowTemplate,
    rowFont,
    rowMaxLineCount,
    rowSelectionTemplate,
    rowSelectedCallback,
    rowHideCallback,
    dataTypeSelectSound,
    dataTypeResetControlCallback,
  ] = getRowInfoFromOrderListBoxData(orderListBoxData)
  orderListBox.rowHeight = rowHeight
  orderListBox.rowTemplate = rowTemplate
  orderListBox.rowFont = rowFont
  orderListBox.rowMaxLineCount = rowMaxLineCount
  orderListBox.rowSelectionTemplate = rowSelectionTemplate
  orderListBox.rowSelectedCallback = rowSelectedCallback
  orderListBox.rowHideCallback = rowHideCallback
  orderListBox.dataTypeSelectSound = dataTypeSelectSound
  orderListBox.dataTypeResetControlCallback = dataTypeResetControlCallback

  const templateName = orderListBox.rowTemplate
  const selectTemplate = orderListBox.rowSelectionTemplate
  const rowHeightLocal = orderListBox.rowHeight
  const dataTypeSelectSoundLocal = orderListBox.dataTypeSelectSound
  const rowHideCallbackLocal = orderListBox.rowHideCallback
  const resetControlCallback = orderListBox.dataTypeResetControlCallback

  const [showValue, showValueAtTooltip] = getShowValueInfoFromListBoxData(orderListBoxData)
  orderListBox.showValue = showValue
  orderListBox.showValueAtTooltip = showValueAtTooltip

  const setupFunction = (...args: unknown[]): undefined => {
    orderListBox.RowSetupFunction(
      asOrderRowControl(args[0]),
      asListEntry(args[1]),
      asOrderScrollList(args[2])
    )
  }
  const selectCallback = (
    previouslySelectedData: unknown,
    selectedData: unknown,
    reselectingDuringRebuild?: boolean
  ): undefined => {
    if (orderListBox.disabled) {
      return
    }
    orderListBox.OnRowSelected(
      previouslySelectedData,
      selectedData,
      reselectingDuringRebuild,
      buttonMoveUpControl,
      buttonMoveDownControl,
      buttonMoveTotalUpControl,
      buttonMoveTotalDownControl
    )
    if (
      orderListBox.rowSelectedCallback !== undefined &&
      typeof orderListBox.rowSelectedCallback === "function"
    ) {
      orderListBox.rowSelectedCallback(
        orderListBox,
        previouslySelectedData,
        selectedData,
        reselectingDuringRebuild
      )
    }
  }

  ZO_ScrollList_AddDataType(
    scrollListControl,
    dataTypeId,
    templateName,
    rowHeightLocal,
    setupFunction,
    rowHideCallbackLocal,
    dataTypeSelectSoundLocal,
    resetControlCallback
  )
  ZO_ScrollList_EnableSelection(scrollListControl, selectTemplate, selectCallback)

  return orderListBox
}
