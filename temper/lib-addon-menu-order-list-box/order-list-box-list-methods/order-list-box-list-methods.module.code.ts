import {
  asControl,
  asDisplayText,
  asOrderRowControl,
} from "../order-list-box-casts/order-list-box-casts.module.code.ts"
import {
  ERROR_TEXTS,
  mouseCursorDoNotCare,
  mouseCursorHand,
  mouseCursorResizeNS,
} from "../order-list-box-constants/order-list-box-constants.module.code.ts"
import { setMouseCursor } from "../order-list-box-drag-cursor/order-list-box-drag-cursor.module.code.ts"
import { checkOrderListBoxEntriesForCorrectFormat } from "../order-list-box-errors/order-list-box-errors.module.code.ts"
import { updateRemoveEntryEnabledState } from "../order-list-box-row-setup/order-list-box-row-setup.module.code.ts"
import { getStringFromValue } from "../order-list-box-state/order-list-box-state.module.code.ts"

export function populate(this: OrderListBox, orderListBoxData: OrderListBoxData): ListEntry[] {
  const masterList = orderListBoxData.listEntries ?? []
  checkOrderListBoxEntriesForCorrectFormat(masterList)
  return masterList
}

export function updateScrollList(
  this: OrderListBox,
  control: OrderScrollList,
  data: ListEntry[],
  rowDataType: number,
  lamControl: LamControl
): undefined {
  const dataCopy = ZO_DeepTableCopy(data)
  const dataList = ZO_ScrollList_GetDataList<ListEntry>(control)

  ZO_ScrollList_Clear(control)

  if (dataList !== undefined) {
    for (const value of dataCopy) {
      const entry = ZO_ScrollList_CreateDataEntry(rowDataType, value)
      dataList.push(entry)
    }
  }

  if (lamControl.isBuilding === true) {
    return
  }
  ZO_ScrollList_Commit(control)
}

export function rowSetupFunction(
  this: OrderListBox,
  rowControl: OrderRowControl,
  data: ListEntry,
  scrollList: OrderScrollList
): undefined {
  rowControl.SetFont(this.rowFont)
  rowControl.SetMaxLineCount(this.rowMaxLineCount)

  let rowText: string | number =
    data.text !== undefined ? getStringFromValue(data.text) : (ERROR_TEXTS.no_line_text_given ?? "")
  if (this.showPosition) {
    rowText = tostring(rowControl.index) + ") " + rowText
  }
  if (this.showValue) {
    rowText = rowText + " [" + tostring(data.value) + "]"
  }
  rowControl.SetText(rowText)

  rowControl.SetHandler("OnMouseUp", (...args: unknown[]): undefined => {
    if (this.disabled) {
      return
    }
    this.mouseDown = undefined
    const pRowControl = asOrderRowControl(args[0])
    const mouseButton = args[1]
    const upInside = args[2]
    if (upInside !== true || mouseButton !== MOUSE_BUTTON_INDEX_LEFT) {
      return
    }
    setMouseCursor(mouseCursorHand)
    if (this.draggingEntryId !== undefined) {
      return
    }
    ZO_ScrollList_MouseClick(scrollList, pRowControl)
  })
  rowControl.SetHandler("OnMouseDown", (...args: unknown[]): undefined => {
    if (this.disabled) {
      return
    }
    this.mouseDown = true
    const mouseButton = args[1]
    if (this.draggingEntryId === undefined) {
      if (mouseButton === MOUSE_BUTTON_INDEX_LEFT && !this.isDragDisabled) {
        setMouseCursor(mouseCursorResizeNS)
      } else {
        setMouseCursor(mouseCursorHand)
      }
    } else {
      setMouseCursor(mouseCursorResizeNS)
    }
  })

  let tooltip: string | number | undefined =
    data.tooltip !== undefined ? asDisplayText(data.tooltip) : undefined
  if (this.showValueAtTooltip) {
    tooltip = tostring(tooltip) + " [" + tostring(data.value) + "]"
  }

  rowControl.SetHandler("OnMouseEnter", (...args: unknown[]): undefined => {
    if (this.disabled) {
      return
    }
    const pRowControl = asControl(args[0])
    const isMouseDown = this.mouseDown
    if (this.draggingEntryId === undefined && isMouseDown !== true) {
      setMouseCursor(mouseCursorHand)
    }
    if (isMouseDown !== true && tooltip !== undefined) {
      ZO_Tooltips_ShowTextTooltip(pRowControl, LEFT, tostring(tooltip))
    }
  })
  rowControl.SetHandler("OnMouseExit", (): undefined => {
    if (this.disabled) {
      return
    }
    if (this.draggingEntryId === undefined && this.mouseDown !== true) {
      setMouseCursor(mouseCursorDoNotCare)
    }
    ZO_Tooltips_HideTextTooltip()
  })
  rowControl.SetHidden(false)
  rowControl.SetMouseEnabled(!this.disabled)
}

export function onRowSelected(
  this: OrderListBox,
  _previouslySelectedData: unknown,
  selectedData: unknown,
  _reselectingDuringRebuild: boolean | undefined,
  buttonMoveUpControl: Control,
  buttonMoveDownControl: Control,
  buttonMoveTotalUpControl: Control,
  buttonMoveTotalDownControl: Control
): undefined {
  if (this.disabled) {
    return
  }
  if (selectedData === undefined) {
    buttonMoveUpControl.SetMouseEnabled(false)
    buttonMoveUpControl.SetHidden(true)
    buttonMoveDownControl.SetMouseEnabled(false)
    buttonMoveDownControl.SetHidden(true)
    buttonMoveTotalUpControl.SetMouseEnabled(false)
    buttonMoveTotalUpControl.SetHidden(true)
    buttonMoveTotalDownControl.SetMouseEnabled(false)
    buttonMoveTotalDownControl.SetHidden(true)
    updateRemoveEntryEnabledState(this.control)
  } else {
    const selectedIndex = ZO_ScrollList_GetSelectedDataIndex(this.scrollListControl)
    if (selectedIndex === undefined) {
      return
    }
    this.UpdateMoveButtonsEnabledState(selectedIndex)
  }
}

export function moveItem(
  this: OrderListBox,
  selectedIndex: number | undefined,
  moveUp: boolean | undefined,
  moveToIndex: number | undefined,
  moveToTopOrBottom: boolean | undefined
): undefined {
  if (this.disabled) {
    return
  }
  if (moveUp === undefined && moveToIndex === undefined) {
    return
  }
  const scrollListControl = this.scrollListControl
  if (!ZO_ScrollList_HasVisibleData(scrollListControl)) {
    return
  }
  const resolvedIndex = selectedIndex ?? ZO_ScrollList_GetSelectedDataIndex(scrollListControl)
  if (resolvedIndex === undefined) {
    return
  }
  const currentData = scrollListControl.data
  const maxEntries = currentData.length
  const entryToMove = this.orderListBoxData.listEntries[resolvedIndex - 1]
  if (entryToMove === undefined) {
    return
  }
  let newIndex: number
  let movedUp: boolean | undefined
  if (moveUp === true && resolvedIndex > 1) {
    newIndex = moveToTopOrBottom === true ? 1 : resolvedIndex - 1
    this.orderListBoxData.listEntries.splice(resolvedIndex - 1, 1)
    this.orderListBoxData.listEntries.splice(newIndex - 1, 0, entryToMove)
    movedUp = true
  } else if (moveUp === false && resolvedIndex < maxEntries) {
    newIndex = moveToTopOrBottom === true ? maxEntries : resolvedIndex + 1
    this.orderListBoxData.listEntries.splice(resolvedIndex - 1, 1)
    this.orderListBoxData.listEntries.splice(newIndex - 1, 0, entryToMove)
    movedUp = false
  } else if (
    moveUp === undefined &&
    moveToTopOrBottom === undefined &&
    moveToIndex !== undefined &&
    moveToIndex >= 1 &&
    moveToIndex <= maxEntries
  ) {
    newIndex = moveToIndex
    this.orderListBoxData.listEntries.splice(resolvedIndex - 1, 1)
    this.orderListBoxData.listEntries.splice(newIndex - 1, 0, entryToMove)
  } else {
    return
  }

  this.control.UpdateValue(false, this.orderListBoxData.listEntries)

  const wasMovedToLastEntry = newIndex === maxEntries
  const wasMovedToFirstEntry = newIndex === 1

  zo_callLater((): undefined => {
    const scrollBar = scrollListControl.scrollbar
    const [, rawMax] = scrollBar.GetMinMax()
    const valueMax = rawMax ?? 9999
    if (moveUp === undefined) {
      if (wasMovedToLastEntry) {
        ZO_ScrollList_ScrollAbsolute(scrollListControl, valueMax)
        ZO_ScrollList_SelectData(
          scrollListControl,
          currentData[newIndex - 1]?.data,
          undefined,
          undefined,
          true
        )
      } else if (wasMovedToFirstEntry) {
        ZO_ScrollList_ResetToTop(scrollListControl)
        ZO_ScrollList_SelectData(
          scrollListControl,
          currentData[newIndex - 1]?.data,
          undefined,
          undefined,
          true
        )
      } else {
        ZO_ScrollList_SelectDataAndScrollIntoView(
          scrollListControl,
          currentData[newIndex - 1]?.data,
          undefined,
          false
        )
      }
    } else {
      if (wasMovedToLastEntry) {
        ZO_ScrollList_ScrollAbsolute(scrollListControl, valueMax)
        ZO_ScrollList_SelectData(
          scrollListControl,
          currentData[newIndex - 1]?.data,
          undefined,
          undefined,
          true
        )
      } else if (wasMovedToFirstEntry) {
        ZO_ScrollList_ResetToTop(scrollListControl)
        ZO_ScrollList_SelectData(
          scrollListControl,
          currentData[newIndex - 1]?.data,
          undefined,
          undefined,
          true
        )
      } else {
        scrollListControl.selectedDataIndex = resolvedIndex
        if (movedUp === true) {
          ZO_ScrollList_SelectPreviousData(scrollListControl, undefined, false)
        } else {
          ZO_ScrollList_SelectNextData(scrollListControl, undefined, false)
        }
      }
    }
    this.UpdateMoveButtonsEnabledState(newIndex)
  }, 100)
}

export function updateMoveButtonsEnabledState(this: OrderListBox, newIndex?: number): undefined {
  if (this.disabled || this.areButtonsDisabled) {
    return
  }
  updateRemoveEntryEnabledState(this.control)
  if (newIndex === undefined) {
    return
  }
  this.moveUpButton.SetHidden(false)
  this.moveDownButton.SetHidden(false)
  this.moveTotalUpButton.SetHidden(false)
  this.moveTotalDownButton.SetHidden(false)
  if (newIndex === 1) {
    this.moveUpButton.SetMouseEnabled(false)
    this.moveUpButton.SetHidden(true)
    this.moveDownButton.SetMouseEnabled(true)
    this.moveTotalUpButton.SetMouseEnabled(false)
    this.moveTotalUpButton.SetHidden(true)
    this.moveTotalDownButton.SetMouseEnabled(true)
  } else if (newIndex === this.scrollListControl.data.length) {
    this.moveUpButton.SetMouseEnabled(true)
    this.moveDownButton.SetMouseEnabled(false)
    this.moveDownButton.SetHidden(true)
    this.moveTotalUpButton.SetMouseEnabled(true)
    this.moveTotalDownButton.SetMouseEnabled(false)
    this.moveTotalDownButton.SetHidden(true)
  } else {
    this.moveUpButton.SetMouseEnabled(true)
    this.moveDownButton.SetMouseEnabled(true)
    this.moveTotalUpButton.SetMouseEnabled(true)
    this.moveTotalDownButton.SetMouseEnabled(true)
  }
}

export function getCurrentEntries(this: OrderListBox): ListEntry[] | undefined {
  return this.control.data.getFunc()
}
