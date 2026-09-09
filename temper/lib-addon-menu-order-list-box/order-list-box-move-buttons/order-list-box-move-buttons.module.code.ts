import {
  asControl,
  asOrderButtonControl,
} from "../order-list-box-casts/order-list-box-casts.module.code.ts"
import {
  mouseCursorDoNotCare,
  mouseCursorHand,
  SCROLLBAR_END_ARROW_TEXTURE,
  SCROLLBOX_DOWN_TEXTURE,
  SCROLLBOX_UP_TEXTURE,
  translation,
} from "../order-list-box-constants/order-list-box-constants.module.code.ts"
import { setMouseCursor } from "../order-list-box-drag-cursor/order-list-box-drag-cursor.module.code.ts"
import { getStringFromValue, wm } from "../order-list-box-state/order-list-box-state.module.code.ts"

export function createMoveButtons(
  this: void,
  orderListBox: OrderListBox,
  scrollListControl: OrderScrollList,
  controlName: string
): LuaMultiReturn<
  [OrderButtonControl, OrderButtonControl, OrderButtonControl, OrderButtonControl]
> {
  function onButtonClicked(
    this: void,
    mouseButton: unknown,
    isUp: boolean,
    moveToTopOrBottom: boolean
  ): undefined {
    if (mouseButton !== MOUSE_BUTTON_INDEX_LEFT) {
      return
    }
    const selectedEntry = ZO_ScrollList_GetSelectedData(scrollListControl)
    if (selectedEntry === undefined) {
      return
    }
    const selectedIndex = ZO_ScrollList_GetSelectedDataIndex(scrollListControl)
    if (isUp) {
      if (selectedIndex === 1) {
        return
      }
    } else {
      if (selectedIndex === scrollListControl.data.length) {
        return
      }
    }
    orderListBox.MoveItem(selectedIndex, isUp, undefined, moveToTopOrBottom)
  }

  const buttonMoveUpControl = asOrderButtonControl(
    wm.CreateControl(controlName + "_ButtonMoveUp", scrollListControl, CT_BUTTON)
  )
  buttonMoveUpControl.SetDimensions(16, 16)
  buttonMoveUpControl.SetNormalTexture(string.format(SCROLLBOX_UP_TEXTURE, "up"))
  buttonMoveUpControl.SetMouseOverTexture(string.format(SCROLLBOX_UP_TEXTURE, "over"))
  buttonMoveUpControl.SetPressedMouseOverTexture(string.format(SCROLLBOX_UP_TEXTURE, "down"))
  buttonMoveUpControl.SetPressedTexture(string.format(SCROLLBOX_UP_TEXTURE, "down"))
  buttonMoveUpControl.SetDisabledTexture(string.format(SCROLLBOX_UP_TEXTURE, "up_disabled"))
  buttonMoveUpControl.SetPressedOffset(2, 2)
  buttonMoveUpControl.SetAnchor(LEFT, scrollListControl, RIGHT, 0, -16)
  buttonMoveUpControl.SetHidden(true)
  buttonMoveUpControl.SetClickSound("Click")
  buttonMoveUpControl.data = { tooltipText: getStringFromValue(translation.UP) }
  buttonMoveUpControl.SetHandler("OnMouseEnter", (...args: unknown[]): undefined => {
    if (orderListBox.disabled) {
      return
    }
    ZO_Options_OnMouseEnter(asControl(args[0]))
    setMouseCursor(mouseCursorHand)
  })
  buttonMoveUpControl.SetHandler("OnMouseExit", (...args: unknown[]): undefined => {
    if (orderListBox.disabled) {
      return
    }
    ZO_Options_OnMouseExit(asControl(args[0]))
    setMouseCursor(mouseCursorDoNotCare)
  })
  buttonMoveUpControl.SetHandler("OnClicked", (...args: unknown[]): undefined => {
    if (orderListBox.disabled) {
      return
    }
    onButtonClicked(args[1], true, false)
  })
  buttonMoveUpControl.SetMouseEnabled(false)

  const buttonMoveDownControl = asOrderButtonControl(
    wm.CreateControl(controlName + "_ButtonMoveDown", scrollListControl, CT_BUTTON)
  )
  buttonMoveDownControl.SetDimensions(16, 16)
  buttonMoveDownControl.SetNormalTexture(string.format(SCROLLBOX_DOWN_TEXTURE, "up"))
  buttonMoveDownControl.SetMouseOverTexture(string.format(SCROLLBOX_DOWN_TEXTURE, "over"))
  buttonMoveDownControl.SetPressedMouseOverTexture(string.format(SCROLLBOX_DOWN_TEXTURE, "down"))
  buttonMoveDownControl.SetPressedTexture(string.format(SCROLLBOX_DOWN_TEXTURE, "down"))
  buttonMoveDownControl.SetDisabledTexture(string.format(SCROLLBOX_DOWN_TEXTURE, "up_disabled"))
  buttonMoveDownControl.SetPressedOffset(2, 2)
  buttonMoveDownControl.SetAnchor(LEFT, scrollListControl, RIGHT, 0, 12)
  buttonMoveDownControl.SetHidden(true)
  buttonMoveDownControl.SetClickSound("Click")
  buttonMoveDownControl.data = { tooltipText: getStringFromValue(translation.DOWN) }
  buttonMoveDownControl.SetHandler("OnMouseEnter", (...args: unknown[]): undefined => {
    if (orderListBox.disabled) {
      return
    }
    ZO_Options_OnMouseEnter(asControl(args[0]))
    setMouseCursor(mouseCursorHand)
  })
  buttonMoveDownControl.SetHandler("OnMouseExit", (...args: unknown[]): undefined => {
    if (orderListBox.disabled) {
      return
    }
    ZO_Options_OnMouseExit(asControl(args[0]))
    setMouseCursor(mouseCursorDoNotCare)
  })
  buttonMoveDownControl.SetHandler("OnClicked", (...args: unknown[]): undefined => {
    if (orderListBox.disabled) {
      return
    }
    onButtonClicked(args[1], false, false)
  })
  buttonMoveDownControl.SetMouseEnabled(false)

  const buttonMoveTotalUpControl = asOrderButtonControl(
    wm.CreateControl(controlName + "_ButtonMoveTotalUp", scrollListControl, CT_BUTTON)
  )
  buttonMoveTotalUpControl.SetDimensions(16, 16)
  buttonMoveTotalUpControl.SetNormalTexture(string.format(SCROLLBAR_END_ARROW_TEXTURE, "up"))
  buttonMoveTotalUpControl.SetMouseOverTexture(string.format(SCROLLBAR_END_ARROW_TEXTURE, "over"))
  buttonMoveTotalUpControl.SetPressedMouseOverTexture(
    string.format(SCROLLBAR_END_ARROW_TEXTURE, "down")
  )
  buttonMoveTotalUpControl.SetPressedTexture(string.format(SCROLLBAR_END_ARROW_TEXTURE, "down"))
  buttonMoveTotalUpControl.SetDisabledTexture(
    string.format(SCROLLBAR_END_ARROW_TEXTURE, "disabled")
  )
  buttonMoveTotalUpControl.SetPressedOffset(2, 2)
  buttonMoveTotalUpControl.SetTextureCoords(1, 0, 1, 0)
  buttonMoveTotalUpControl.SetAnchor(BOTTOM, buttonMoveUpControl, TOP, 0, -4)
  buttonMoveTotalUpControl.SetHidden(true)
  buttonMoveTotalUpControl.SetClickSound("Click")
  buttonMoveTotalUpControl.data = { tooltipText: getStringFromValue(translation.TOTAL_UP) }
  buttonMoveTotalUpControl.SetHandler("OnMouseEnter", (...args: unknown[]): undefined => {
    if (orderListBox.disabled) {
      return
    }
    ZO_Options_OnMouseEnter(asControl(args[0]))
    setMouseCursor(mouseCursorHand)
  })
  buttonMoveTotalUpControl.SetHandler("OnMouseExit", (...args: unknown[]): undefined => {
    if (orderListBox.disabled) {
      return
    }
    ZO_Options_OnMouseExit(asControl(args[0]))
    setMouseCursor(mouseCursorDoNotCare)
  })
  buttonMoveTotalUpControl.SetHandler("OnClicked", (...args: unknown[]): undefined => {
    if (orderListBox.disabled) {
      return
    }
    onButtonClicked(args[1], true, true)
  })
  buttonMoveTotalUpControl.SetMouseEnabled(false)

  const buttonMoveTotalDownControl = asOrderButtonControl(
    wm.CreateControl(controlName + "_ButtonMoveTotalDown", scrollListControl, CT_BUTTON)
  )
  buttonMoveTotalDownControl.SetDimensions(16, 16)
  buttonMoveTotalDownControl.SetNormalTexture(string.format(SCROLLBAR_END_ARROW_TEXTURE, "up"))
  buttonMoveTotalDownControl.SetMouseOverTexture(string.format(SCROLLBAR_END_ARROW_TEXTURE, "over"))
  buttonMoveTotalDownControl.SetPressedMouseOverTexture(
    string.format(SCROLLBAR_END_ARROW_TEXTURE, "down")
  )
  buttonMoveTotalDownControl.SetPressedTexture(string.format(SCROLLBAR_END_ARROW_TEXTURE, "down"))
  buttonMoveTotalDownControl.SetDisabledTexture(
    string.format(SCROLLBAR_END_ARROW_TEXTURE, "disabled")
  )
  buttonMoveTotalDownControl.SetPressedOffset(2, 2)
  buttonMoveTotalDownControl.SetAnchor(TOP, buttonMoveDownControl, BOTTOM, 0, 4)
  buttonMoveTotalDownControl.SetHidden(true)
  buttonMoveTotalDownControl.SetClickSound("Click")
  buttonMoveTotalDownControl.data = { tooltipText: getStringFromValue(translation.TOTAL_DOWN) }
  buttonMoveTotalDownControl.SetHandler("OnMouseEnter", (...args: unknown[]): undefined => {
    if (orderListBox.disabled) {
      return
    }
    ZO_Options_OnMouseEnter(asControl(args[0]))
    setMouseCursor(mouseCursorHand)
  })
  buttonMoveTotalDownControl.SetHandler("OnMouseExit", (...args: unknown[]): undefined => {
    if (orderListBox.disabled) {
      return
    }
    ZO_Options_OnMouseExit(asControl(args[0]))
    setMouseCursor(mouseCursorDoNotCare)
  })
  buttonMoveTotalDownControl.SetHandler("OnClicked", (...args: unknown[]): undefined => {
    if (orderListBox.disabled) {
      return
    }
    onButtonClicked(args[1], false, true)
  })
  buttonMoveTotalDownControl.SetMouseEnabled(false)

  return $multi(
    buttonMoveUpControl,
    buttonMoveDownControl,
    buttonMoveTotalUpControl,
    buttonMoveTotalDownControl
  )
}
