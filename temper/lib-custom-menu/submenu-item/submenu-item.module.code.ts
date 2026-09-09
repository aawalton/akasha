import { asLcmLabel } from "../custom-menu-casts/custom-menu-casts.module.code.ts"
import {
  SUBMENU_ITEM_MOUSE_CLICKED,
  SUBMENU_ITEM_MOUSE_ENTER,
  SUBMENU_ITEM_MOUSE_EXIT,
} from "../custom-menu-constants/custom-menu-constants.module.code.ts"
import type { LcmSubmenuParent } from "../custom-menu-types/custom-menu-types.module.code.ts"
import { menu } from "../eso-menu/eso-menu.module.code.ts"
import { setTimeout } from "../submenu-timeout/submenu-timeout.module.code.ts"

const wm = WINDOW_MANAGER

export function subMenuItemFactory(
  this: void,
  pool: ObjectPool<LcmSubmenuParent>
): LcmSubmenuParent {
  const control = CreateControlFromVirtual<LcmSubmenuParent>(
    "ZO_CustomSubMenuItem",
    menu,
    "ZO_NotificationsRowButton",
    pool.GetNextControlId()
  )

  const arrowContainer = control.CreateControl<Control>("$(parent)Arrow", CT_CONTROL)
  arrowContainer.SetAnchor(RIGHT, control, RIGHT, 0, 0)
  arrowContainer.SetDimensions(32, 16)

  const arrow = arrowContainer.CreateControl<TextureControl>("$(parent)Texture", CT_TEXTURE)
  arrow.SetAnchor(RIGHT, arrowContainer, RIGHT, 0, 0)
  arrow.SetDimensions(16, 20)
  arrow.SetTexture("EsoUI/Art/Miscellaneous/colorPicker_slider_vertical.dds")
  arrow.SetTextureCoords(0, 0.5, 0, 1)

  control.checkbox = arrowContainer

  let clicked = false

  const label = wm.CreateControl("$(parent)Name", control, CT_LABEL)
  label.SetAnchor(TOPLEFT)
  control.nameLabel = asLcmLabel(label)

  control.SetHandler("OnMouseEnter", () => {
    ZO_Menu_EnterItem(control)
    clicked = false
    setTimeout(() => {
      if (control.OnSelect !== undefined) {
        control.OnSelect(SUBMENU_ITEM_MOUSE_ENTER)
      }
    })
  })
  control.SetHandler("OnMouseExit", () => {
    ZO_Menu_ExitItem(control)
    if (!clicked) {
      setTimeout(() => {
        if (control.OnSelect !== undefined) {
          control.OnSelect(SUBMENU_ITEM_MOUSE_EXIT)
        }
      })
    }
  })
  control.SetHandler("OnMouseDown", () => {
    IgnoreMouseDownEditFocusLoss()
    clicked = true
    if (control.OnSelect !== undefined) {
      control.OnSelect(SUBMENU_ITEM_MOUSE_ENTER)
    }
  })
  control.SetHandler("OnMouseUp", (_self: unknown, button: unknown, upInside: unknown) => {
    if (upInside === true && button === MOUSE_BUTTON_INDEX_LEFT) {
      if (control.OnSelect !== undefined) {
        control.OnSelect(SUBMENU_ITEM_MOUSE_CLICKED)
      }
    }
  })

  return control
}
