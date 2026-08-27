import { asNumber } from "./casts"
import {
  EVENT_HANDLER_NAMESPACE,
  globalMouseDown,
  globalMouseUp,
  mouseCursorDoNotCare,
  mouseCursorHand,
  mouseCursorResizeNS,
} from "./constants"
import {
  abortDragging,
  autoScroll,
  clearDragging,
  disableOnUpdateHandlerAndResetMouseCursor,
  getCursorTLC,
  setMouseCursor,
} from "./drag-helpers"
import { em, getStringFromValue, state } from "./state"
import type { OrderListBox, OrderRowControl } from "./types"

export function OnGlobalMouseDownDuringDrag(this: OrderListBox, ...args: unknown[]): undefined {
  if (this.disabled || this.isDragDisabled) {
    return
  }
  const mouseButton = args[1]
  if (this.draggingEntryId !== undefined && this.draggingSortListContents !== undefined) {
    this.mouseButtonPressed = asNumber(mouseButton)
  }
}

export function OnGlobalMouseUpDuringDrag(this: OrderListBox, ...args: unknown[]): undefined {
  if (this.disabled || this.isDragDisabled) {
    return
  }
  const mouseButton = args[1]
  if (mouseButton !== MOUSE_BUTTON_INDEX_LEFT) {
    abortDragging(this)
    setMouseCursor(mouseCursorDoNotCare)
  }
  if (this.draggingEntryId !== undefined && this.draggingSortListContents !== undefined) {
    const controlBelowMouse = moc()
    if (
      controlBelowMouse === undefined ||
      controlBelowMouse.GetParent() !== this.draggingSortListContents
    ) {
      abortDragging(this)
      setMouseCursor(mouseCursorDoNotCare)
    }
  }
}

export function UpdateCursorTLC(
  this: OrderListBox,
  isHidden: boolean,
  _draggedControl?: Control
): undefined {
  if (state.cursorTLC === undefined) {
    getCursorTLC()
  }
  const cursorTLC = state.cursorTLC
  const cursorTLCLabel = state.cursorTLCLabel
  if (cursorTLC === undefined || cursorTLCLabel === undefined) {
    return
  }
  cursorTLC.ClearAnchors()
  cursorTLC.SetResizeToFitDescendents(true)
  if (!isHidden) {
    cursorTLC.orderListBox = this
    cursorTLC.SetAnchor(LEFT, GuiMouse, RIGHT, 5, 0)
    cursorTLCLabel.SetText(this.draggingText ?? "")
    const textWidth = cursorTLCLabel.GetTextWidth() + 2
    cursorTLCLabel.SetWidth(textWidth)
    cursorTLCLabel.SetHeight(this.rowHeight)
    cursorTLC.SetWidth(textWidth)
    cursorTLC.SetHeight(this.rowHeight)
    const [rawWidth, rawHeight] = cursorTLCLabel.GetDimensions()
    let width = rawWidth
    let height = rawHeight
    if (width > 600) {
      width = 600
    }
    if (height > 100) {
      height = 100
    }
    cursorTLC.SetDimensionConstraints(width, height, 600, 100)
    cursorTLC.SetDrawTier(DT_HIGH)
    cursorTLC.SetDrawLayer(DL_OVERLAY)
    cursorTLC.SetDrawLevel(5)
    cursorTLC.SetAlpha(0.7)
  } else {
    cursorTLC.orderListBox = undefined
    cursorTLC.SetDimensions(0, 0)
    cursorTLCLabel.SetText("")
    cursorTLC.SetDrawTier(DT_LOW)
    cursorTLC.SetDrawLayer(DL_BACKGROUND)
    cursorTLC.SetDrawLevel(0)
    cursorTLC.SetAlpha(0)
  }
  cursorTLC.SetHidden(isHidden)
  cursorTLC.SetMouseEnabled(false)
}

export function DragOnUpdateCallback(
  this: OrderListBox,
  _draggedControl: OrderRowControl
): undefined {
  if (this.disabled || this.isDragDisabled) {
    abortDragging(this)
    return
  }

  const gameTimeMS = GetGameTimeMilliseconds()
  const gameTimeDeltaNeeded = 200
  let updateAutoScroll = false
  if (this.draggingUpdateTime === undefined) {
    this.draggingUpdateTime = gameTimeMS
    updateAutoScroll = true
  } else if (this.draggingUpdateTime > 0) {
    if (gameTimeMS >= this.draggingUpdateTime + gameTimeDeltaNeeded) {
      this.draggingUpdateTime = gameTimeMS
      updateAutoScroll = true
    }
  }
  if (updateAutoScroll) {
    autoScroll(this)
  }
}

export function StartDragging(
  this: OrderListBox,
  draggedControl: OrderRowControl,
  mouseButton: number
): undefined {
  if (this.disabled || this.isDragDisabled) {
    return
  }
  if (mouseButton !== MOUSE_BUTTON_INDEX_LEFT) {
    return
  }
  this.draggingEntryId = draggedControl.index
  this.draggingSortListContents = draggedControl.GetParent()
  this.draggingText = getStringFromValue(draggedControl.dataEntry.data.text)
  this.mouseButtonPressed = MOUSE_BUTTON_INDEX_LEFT

  this.UpdateCursorTLC(false, draggedControl)

  setMouseCursor(mouseCursorResizeNS)
  ZO_ScrollList_SelectData(this.scrollListControl, undefined, undefined, undefined, true)
  em.RegisterForEvent(
    EVENT_HANDLER_NAMESPACE + globalMouseDown,
    EVENT_GLOBAL_MOUSE_DOWN,
    (...args: unknown[]): undefined => {
      this.OnGlobalMouseDownDuringDrag(...args)
    }
  )
  em.RegisterForEvent(
    EVENT_HANDLER_NAMESPACE + globalMouseUp,
    EVENT_GLOBAL_MOUSE_UP,
    (...args: unknown[]): undefined => {
      this.OnGlobalMouseUpDuringDrag(...args)
    }
  )

  this.draggingUpdateTime = undefined
  this.scrollListControl.SetHandler("OnUpdate", (): undefined => {
    this.DragOnUpdateCallback(draggedControl)
  })
}

export function StopDragging(this: OrderListBox, draggedOnToControl: OrderRowControl): undefined {
  zo_callLater((): undefined => {
    const mouseButton = this.mouseButtonPressed
    if (this.disabled || this.isDragDisabled) {
      return
    }
    disableOnUpdateHandlerAndResetMouseCursor(this)
    setMouseCursor(mouseCursorHand)
    if (
      mouseButton !== undefined &&
      mouseButton === MOUSE_BUTTON_INDEX_LEFT &&
      this.draggingEntryId !== undefined &&
      this.draggingSortListContents !== undefined
    ) {
      this.MoveItem(this.draggingEntryId, undefined, draggedOnToControl.index, undefined)
    }
    clearDragging(this)
  }, 50)
}
