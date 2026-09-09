import type {
  LcmLabel,
  LcmRowControl,
  PooledRow,
} from "../custom-menu-types/custom-menu-types.module.code.ts"
import { menu } from "../eso-menu/eso-menu.module.code.ts"
import { setupDivider, setupHeader } from "../menu-row-setup/menu-row-setup.module.code.ts"

let upInside: LcmRowControl | undefined

export function resetMenuItem(this: void, button: PooledRow): undefined {
  button.SetHidden(true)
  button.ClearAnchors()
  button.menuIndex = undefined
  button.OnSelect = undefined
  button.tooltip = undefined
}

export function resetCheckBox(this: void, checkBox: PooledRow): undefined {
  resetMenuItem(checkBox)
  ZO_CheckButton_SetToggleFunction(checkBox, undefined)
  ZO_CheckButton_SetUnchecked(checkBox)
}

export function menuItemFactory(this: void, pool: ObjectPool<LcmRowControl>): LcmRowControl {
  const control = CreateControlFromVirtual<LcmRowControl>(
    "ZO_CustomMenuItem",
    menu,
    "ZO_MenuItem",
    pool.GetNextControlId()
  )
  const label = control.GetNamedChild<LcmLabel>("Name")
  if (label !== undefined) {
    control.nameLabel = label
  }
  control.SetHandler("OnMouseEnter", () => {
    upInside = control
    ZO_Menu_EnterItem(control)
  })
  control.SetHandler("OnMouseExit", () => {
    upInside = undefined
    ZO_Menu_ExitItem(control)
  })
  control.SetHandler("OnMouseDown", IgnoreMouseDownEditFocusLoss)
  control.SetHandler("OnMouseUp", () => {
    if (upInside !== undefined) {
      ZO_Menu_ClickItem(upInside, 1)
    }
  })
  return control
}

export function checkBoxFactory(this: void, pool: ObjectPool<LcmRowControl>): LcmRowControl {
  return CreateControlFromVirtual<LcmRowControl>(
    "ZO_CustomMenuItemCheckButton",
    menu,
    "ZO_MenuItemCheckButton",
    pool.GetNextControlId()
  )
}

export function dividerFactory(this: void, pool: ObjectPool<LcmRowControl>): LcmRowControl {
  const control = CreateControlFromVirtual<LcmRowControl>(
    "ZO_CustomMenuDivider",
    menu,
    "ZO_NotificationsRowButton",
    pool.GetNextControlId()
  )
  setupDivider(control)
  return control
}

export function headerFactory(this: void, pool: ObjectPool<LcmRowControl>): LcmRowControl {
  const control = CreateControlFromVirtual<LcmRowControl>(
    "ZO_CustomMenuHeader",
    menu,
    "ZO_AddOnSectionHeaderRow",
    pool.GetNextControlId()
  )
  setupHeader(control)
  return control
}
