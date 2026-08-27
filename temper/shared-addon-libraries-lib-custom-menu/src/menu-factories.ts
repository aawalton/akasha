import { menu } from "./eso-menu"
import type { LcmLabel, LcmRowControl, PooledRow } from "./types"
import { SetupDivider, SetupHeader } from "./util"

let upInside: LcmRowControl | undefined

export function ResetMenuItem(this: void, button: PooledRow): undefined {
  button.SetHidden(true)
  button.ClearAnchors()
  button.menuIndex = undefined
  button.OnSelect = undefined
  button.tooltip = undefined
}

export function ResetCheckBox(this: void, checkBox: PooledRow): undefined {
  ResetMenuItem(checkBox)
  ZO_CheckButton_SetToggleFunction(checkBox, undefined)
  ZO_CheckButton_SetUnchecked(checkBox)
}

export function MenuItemFactory(this: void, pool: ObjectPool<LcmRowControl>): LcmRowControl {
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

export function CheckBoxFactory(this: void, pool: ObjectPool<LcmRowControl>): LcmRowControl {
  return CreateControlFromVirtual<LcmRowControl>(
    "ZO_CustomMenuItemCheckButton",
    menu,
    "ZO_MenuItemCheckButton",
    pool.GetNextControlId()
  )
}

export function DividerFactory(this: void, pool: ObjectPool<LcmRowControl>): LcmRowControl {
  const control = CreateControlFromVirtual<LcmRowControl>(
    "ZO_CustomMenuDivider",
    menu,
    "ZO_NotificationsRowButton",
    pool.GetNextControlId()
  )
  SetupDivider(control)
  return control
}

export function HeaderFactory(this: void, pool: ObjectPool<LcmRowControl>): LcmRowControl {
  const control = CreateControlFromVirtual<LcmRowControl>(
    "ZO_CustomMenuHeader",
    menu,
    "ZO_AddOnSectionHeaderRow",
    pool.GetNextControlId()
  )
  SetupHeader(control)
  return control
}
