import {
  asClickHandler,
  asDragData,
  asNumber,
  asScrollDataEntry,
  asShifterBox,
  asShifterBoxList,
  asShifterRowControl,
  asShifterScrollList,
  asTableKey,
} from "./casts"
import {
  EVENT_HANDLER_NAMESPACE,
  GLOBAL_MOUSE_DOWN,
  GLOBAL_MOUSE_UP,
  MOUSECURSOR_DONOTCATRE,
  MOUSECURSOR_NEXTLEFT,
  MOUSECURSOR_NEXTRIGHT,
  multipleRowsDraggedText,
} from "./constants"
import {
  abortDragging,
  autoScroll,
  clearDragging,
  disableOnUpdateHandler,
  getDraggedDataAndTarget,
  resetDragData,
  setMouseCursor,
} from "./drag-helpers"
import { fireCallback, getShallowClonedTable } from "./helpers"
import { ShifterBoxListProto } from "./list-class"
import { hasSameShifterBoxParent, moveEntryToOtherList, selectEntry } from "./list-ops"
import { EM, lib } from "./state"
import type { ShifterBoxList } from "./types"

ShifterBoxListProto.OnGlobalMouseDownDuringDrag = function (
  this: ShifterBoxList,
  _eventId?: unknown,
  mouseButton?: number
): undefined {
  if (!this.enabled || !this.shifterBoxSettings.dragDropEnabled) return
  if (this.shifterBox.currentDragData !== undefined) {
    this.shifterBox.draggingMouseButtonPressed = mouseButton
  }
}

ShifterBoxListProto.OnGlobalMouseUpDuringDrag = function (
  this: ShifterBoxList,
  _eventId?: unknown,
  mouseButton?: number
): undefined {
  if (!this.enabled || !this.shifterBoxSettings.dragDropEnabled) return
  if (mouseButton !== MOUSE_BUTTON_INDEX_LEFT) {
    resetDragData(this.shifterBox)
  }
  const [dragData, sourceListControl, otherSideShifterBox] = getDraggedDataAndTarget(
    this.shifterBox
  )
  if (
    dragData === undefined ||
    sourceListControl === undefined ||
    otherSideShifterBox === undefined
  ) {
    resetDragData(this.shifterBox)
  }
  const controlBelowMouse = moc()
  const parentOfMoc = asShifterScrollList(controlBelowMouse).GetParent()
  const parentVal: unknown = parentOfMoc
  const sourceVal: unknown = sourceListControl
  const otherVal: unknown = otherSideShifterBox
  if (
    controlBelowMouse === undefined ||
    parentOfMoc === undefined ||
    (controlBelowMouse !== undefined &&
      parentOfMoc !== undefined &&
      (parentVal === sourceVal ||
        (parentVal !== otherVal &&
          parentVal !== asShifterScrollList(otherSideShifterBox).contents)))
  ) {
    resetDragData(this.shifterBox)
  }
}

ShifterBoxListProto.DragOnUpdateCallback = function (
  this: ShifterBoxList,
  _draggedControl: Control
): undefined {
  if (!this.enabled || !this.shifterBoxSettings.dragDropEnabled) {
    abortDragging(this.shifterBox)
    return
  }
  const gameTimeMS = GetGameTimeMilliseconds()
  const gameTimeDeltaNeeded = 200
  const draggingUpdateTime = this.shifterBox.draggingUpdateTime
  let updateAutoScroll = false
  if (draggingUpdateTime === undefined) {
    this.shifterBox.draggingUpdateTime = gameTimeMS
    updateAutoScroll = true
  } else if (draggingUpdateTime > 0) {
    if (gameTimeMS >= draggingUpdateTime + gameTimeDeltaNeeded) {
      this.shifterBox.draggingUpdateTime = gameTimeMS
      updateAutoScroll = true
    }
  }
  if (updateAutoScroll) {
    autoScroll(this.shifterBox)
  }
}

ShifterBoxListProto.StartDragging = function (
  this: ShifterBoxList,
  draggedControl: Control,
  mouseButton: number
): undefined {
  if (!this.enabled || !this.shifterBoxSettings.dragDropEnabled) return
  if (mouseButton !== MOUSE_BUTTON_INDEX_LEFT) return

  const currentDragData = asDragData(ZO_ScrollList_GetData(draggedControl))
  const selectedData = getShallowClonedTable(this.list.selectedMultiData)
  let numRowsSelected = selectedData !== undefined ? NonContiguousCount(selectedData) : 1
  const draggedDataEntry = asScrollDataEntry(asShifterRowControl(draggedControl).dataEntry).data
  let isSelected =
    selectedData !== undefined && selectedData.get(asTableKey(draggedDataEntry.key)) !== undefined
  if (!isSelected && selectedData !== undefined) {
    for (const [, selectedRowData] of pairs(selectedData)) {
      if (draggedDataEntry.key === selectedRowData.key) {
        isSelected = true
        break
      }
    }
    if (!isSelected) {
      selectEntry(this, draggedDataEntry.key)
      numRowsSelected = numRowsSelected + 1
      isSelected = true
    }
  }
  const hasMultipleRowsSelected = numRowsSelected > 1
  currentDragData._sourceListControl = this
  currentDragData._sourceDraggedControl = draggedControl
  currentDragData._isSelected = isSelected
  currentDragData._hasMultipleRowsSelected = hasMultipleRowsSelected
  currentDragData._numRowsSelected = numRowsSelected
  currentDragData._isFromLeftList = this.isLeftList
  currentDragData._draggedText = draggedDataEntry.value
  currentDragData._draggedAdditionalText = hasMultipleRowsSelected
    ? zo_strformat(multipleRowsDraggedText, tostring(numRowsSelected - 1))
    : undefined
  this.shifterBox.currentDragData = currentDragData

  this.shifterBox.draggingMouseButtonPressed = mouseButton

  fireCallback(
    this.shifterBox,
    draggedControl,
    this.isLeftList
      ? lib.EVENT_LEFT_LIST_ROW_ON_DRAG_START
      : lib.EVENT_RIGHT_LIST_ROW_ON_DRAG_START,
    this.shifterBox,
    mouseButton,
    currentDragData
  )

  this.shifterBox.UpdateCursorTLC(false, draggedControl)

  const mouseCursor = this.isLeftList ? MOUSECURSOR_NEXTRIGHT : MOUSECURSOR_NEXTLEFT
  setMouseCursor(mouseCursor)

  EM.RegisterForEvent(
    EVENT_HANDLER_NAMESPACE + GLOBAL_MOUSE_DOWN,
    EVENT_GLOBAL_MOUSE_DOWN,
    (_eventCode: number, ...args: unknown[]) => {
      this.OnGlobalMouseDownDuringDrag(args[0], asNumber(args[1]))
    }
  )
  EM.RegisterForEvent(
    EVENT_HANDLER_NAMESPACE + GLOBAL_MOUSE_UP,
    EVENT_GLOBAL_MOUSE_UP,
    (_eventCode: number, ...args: unknown[]) => {
      this.OnGlobalMouseUpDuringDrag(args[0], asNumber(args[1]))
    }
  )

  this.shifterBox.draggingUpdateTime = undefined
  this.shifterBox.shifterBoxControl.SetHandler("OnUpdate", () => {
    this.DragOnUpdateCallback(draggedControl)
  })
}

ShifterBoxListProto.StopDragging = function (
  this: ShifterBoxList,
  draggedOnToControl?: Control
): undefined {
  zo_callLater(() => {
    const mouseButton = this.shifterBox.draggingMouseButtonPressed
    if (!this.enabled || !this.shifterBoxSettings.dragDropEnabled) return
    disableOnUpdateHandler(this.shifterBox)
    setMouseCursor(MOUSECURSOR_DONOTCATRE)

    if (
      mouseButton !== undefined &&
      mouseButton === MOUSE_BUTTON_INDEX_LEFT &&
      GetCursorContentType() === MOUSE_CONTENT_EMPTY
    ) {
      const dragData = this.shifterBox.currentDragData
      if (dragData !== undefined) {
        let wasDragSuccessful: unknown = false

        const sourceListControl = dragData._sourceListControl
        const sameParent = hasSameShifterBoxParent(this, asShifterBoxList(sourceListControl))
        const isLeftList = this.isLeftList
        if (sameParent) {
          const sourceList = isLeftList ? this.shifterBox.rightList : this.shifterBox.leftList
          const destList = this
          const isDragDataSelected = dragData._isSelected
          if (isDragDataSelected === true && isLeftList !== dragData._isFromLeftList) {
            const buttonControl = asShifterBoxList(sourceListControl).buttonControl
            const buttonOnClickedFunction = asClickHandler(buttonControl.GetHandler("OnClicked"))
            wasDragSuccessful = buttonOnClickedFunction(buttonControl)
          } else {
            wasDragSuccessful = moveEntryToOtherList(
              sourceList,
              dragData.key,
              destList,
              this.shifterBox
            )
          }
        }

        fireCallback(
          this.shifterBox,
          draggedOnToControl,
          isLeftList ? lib.EVENT_LEFT_LIST_ROW_ON_DRAG_END : lib.EVENT_RIGHT_LIST_ROW_ON_DRAG_END,
          this.shifterBox,
          mouseButton,
          dragData,
          sameParent,
          wasDragSuccessful
        )
      }
    }
    clearDragging(asShifterBox(this))
  }, 50)
}
