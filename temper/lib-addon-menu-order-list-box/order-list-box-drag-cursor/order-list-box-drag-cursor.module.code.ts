import {
  asCursorTLC,
  asLabelControl,
} from "../order-list-box-casts/order-list-box-casts.module.code.ts"
import {
  EVENT_HANDLER_NAMESPACE,
  GLOBAL_MOUSE_DOWN,
  GLOBAL_MOUSE_UP,
  mouseCursorDoNotCare,
  widgetCursorTLCName,
} from "../order-list-box-constants/order-list-box-constants.module.code.ts"
import { em, STATE, wm } from "../order-list-box-state/order-list-box-state.module.code.ts"

export function setMouseCursor(this: void, cursorName: number): undefined {
  wm.SetMouseCursor(cursorName)
}

export function getCursorTLC(this: void): undefined {
  const cursorTLC = asCursorTLC(wm.GetControlByName(widgetCursorTLCName))
  STATE.cursorTLC = cursorTLC
  STATE.cursorTLCLabel = asLabelControl(GetControl(cursorTLC, "Label"))
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
  em.UnregisterForEvent(EVENT_HANDLER_NAMESPACE + GLOBAL_MOUSE_DOWN, EVENT_GLOBAL_MOUSE_DOWN)
  em.UnregisterForEvent(EVENT_HANDLER_NAMESPACE + GLOBAL_MOUSE_UP, EVENT_GLOBAL_MOUSE_UP)
  orderListBoxObject.scrollListControl.SetHandler("OnUpdate", undefined)

  orderListBoxObject.UpdateCursorTLC(true, undefined)
}

export function abortDragging(this: void, orderListBoxObject: OrderListBox): undefined {
  disableOnUpdateHandlerAndResetMouseCursor(orderListBoxObject)
  clearDragging(orderListBoxObject)
}

export function checkIfDraggedAndDisableUpdateHandler(this: void, _lamPanel?: unknown): undefined {
  if (STATE.cursorTLC === undefined) {
    getCursorTLC()
  }
  const cursorTLC = STATE.cursorTLC
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
