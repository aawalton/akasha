import { asCursorTLC, asLabelControl } from "./casts"
import {
  EVENT_HANDLER_NAMESPACE,
  globalMouseDown,
  globalMouseUp,
  mouseCursorDoNotCare,
  SORT_LIST_ROW_DEFAULT_HEIGHT,
  widgetCursorTLCName,
} from "./constants"
import { em, state, wm } from "./state"
import type { OrderListBox } from "./types"

export function setMouseCursor(this: void, cursorName: number): undefined {
  wm.SetMouseCursor(cursorName)
}

export function getCursorTLC(this: void): undefined {
  const cursorTLC = asCursorTLC(wm.GetControlByName(widgetCursorTLCName))
  state.cursorTLC = cursorTLC
  state.cursorTLCLabel = asLabelControl(GetControl(cursorTLC, "Label"))
  cursorTLC.ClearAnchors()
  cursorTLC.SetDimensions(0, 0)
  return undefined
}

export function clearDragging(this: void, selfVar: OrderListBox): undefined {
  selfVar.draggingEntryId = undefined
  selfVar.draggingSortListContents = undefined
  selfVar.draggingText = undefined
  selfVar.draggingUpdateTime = undefined
  selfVar.mouseButtonPressed = undefined
}

export function disableOnUpdateHandlerAndResetMouseCursor(
  this: void,
  orderListBoxObject: OrderListBox
): undefined {
  em.UnregisterForEvent(EVENT_HANDLER_NAMESPACE + globalMouseDown, EVENT_GLOBAL_MOUSE_DOWN)
  em.UnregisterForEvent(EVENT_HANDLER_NAMESPACE + globalMouseUp, EVENT_GLOBAL_MOUSE_UP)
  orderListBoxObject.scrollListControl.SetHandler("OnUpdate", undefined)

  orderListBoxObject.UpdateCursorTLC(true, undefined)
}

export function abortDragging(this: void, orderListBoxObject: OrderListBox): undefined {
  disableOnUpdateHandlerAndResetMouseCursor(orderListBoxObject)
  clearDragging(orderListBoxObject)
}

export function checkIfDraggedAndDisableUpdateHandler(this: void, _lamPanel?: unknown): undefined {
  if (state.cursorTLC === undefined) {
    getCursorTLC()
  }
  const cursorTLC = state.cursorTLC
  if (cursorTLC === undefined) {
    return
  }
  const orderListBoxObject = cursorTLC.orderListBox
  if (orderListBoxObject === undefined || orderListBoxObject.draggingEntryId === undefined) {
    return
  }
  abortDragging(orderListBoxObject)
  setMouseCursor(mouseCursorDoNotCare)
}

export function autoScroll(this: void, orderListBoxVar: OrderListBox): undefined {
  const scrollListControl = orderListBoxVar.scrollListControl
  const contents = scrollListControl.contents
  const numContentChildren = contents.GetNumChildren()
  const contentsHeight = contents.GetHeight()
  if (numContentChildren === 0) {
    return
  }
  const controlBelowMouse = moc()
  if (controlBelowMouse === undefined || controlBelowMouse.GetParent() !== contents) {
    return
  }
  const [, , , , , offsetY] = controlBelowMouse.GetAnchor(0)
  const orderListBoxRowHeight = orderListBoxVar.rowHeight
  const orderListBoxScrollArea = orderListBoxRowHeight * 1.5
  let scrollValue: number | undefined
  if (offsetY < 0 || (offsetY >= 0 && offsetY <= orderListBoxScrollArea)) {
    scrollValue = orderListBoxRowHeight * 2 * -1
  } else if (offsetY <= contentsHeight && offsetY >= contentsHeight - orderListBoxScrollArea) {
    scrollValue = orderListBoxRowHeight * 2
  }
  if (scrollValue === undefined || scrollValue === 0) {
    return
  }
  ZO_ScrollList_ScrollRelative(scrollListControl, scrollValue, undefined, true)
}
