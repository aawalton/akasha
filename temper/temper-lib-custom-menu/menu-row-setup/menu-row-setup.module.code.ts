import { asValuedString } from "../custom-menu-casts/custom-menu-casts.module.code.ts"
import type {
  LcmControlBase,
  LcmLabel,
  LcmMenuEntry,
  TooltipValue,
  Valued,
} from "../custom-menu-types/custom-menu-types.module.code.ts"

const wm = WINDOW_MANAGER

export function noop(this: void, ..._args: unknown[]): undefined {}

function isCallback<T>(value: Valued<T>): value is (this: void, ...args: unknown[]) => T {
  return type(value) === "function"
}

export function getValueOrCallback<T>(this: void, arg: Valued<T>, ...rest: unknown[]): T {
  if (isCallback(arg)) {
    return arg(...rest)
  }
  return arg
}

export function runTooltip(this: void, control: LcmControlBase, inside: boolean): undefined {
  const tooltip: TooltipValue | undefined = control.tooltip
  if (tooltip === undefined) {
    return
  }
  const text = getValueOrCallback(asValuedString(tooltip), control, inside)
  const parent = control.GetParent()
  if (inside) {
    if (type(text) === "string" && text !== "") {
      if (parent !== undefined) {
        InitializeTooltip(InformationTooltip, parent, BOTTOM, 0, -10)
      }
      SetTooltipText(InformationTooltip, text)
    }
  } else if (InformationTooltip.GetOwner() === parent) {
    ClearTooltip(InformationTooltip)
  }
}

export function setupDivider(this: void, control: LcmControlBase): undefined {
  const label = wm.CreateControlFromVirtual<LcmLabel>(
    "$(parent)Name",
    control,
    "ZO_BaseTooltipDivider"
  )
  label.ClearAnchors()
  label.SetAnchor(TOPLEFT, control, TOPLEFT, 0, 2)
  label.SetAnchor(TOPRIGHT, control, TOPRIGHT, 0, 2)
  label.ClearAnchors = noop
  label.SetAnchor = noop
  label.SetText = noop
  label.SetFont = noop
  label.GetTextDimensions = function (this: void): LuaMultiReturn<[number, number]> {
    return $multi(32, 7)
  }
  label.SetHorizontalAlignment = noop
  label.SetHidden(false)
  control.nameLabel = label

  control.isDivider = true
  control.item = control
  control.SetMouseEnabled(false)
}

export function setupHeader(this: void, control: LcmControlBase): undefined {
  const label = control.GetNamedChild<LcmLabel>("Text")
  const divider = control.GetNamedChild("Divider")
  const checkbox = control.GetNamedChild("Checkbox")
  if (label === undefined) {
    return
  }
  const orgGetTextDimensions = label.GetTextDimensions
  label.GetTextDimensions = function (this: LcmLabel): LuaMultiReturn<[number, number]> {
    const [w, h] = orgGetTextDimensions.call(this)
    let hdivider = 0
    if (divider !== undefined) {
      const [, dh] = divider.GetDimensions()
      hdivider = dh + 9
    }
    return $multi(w, h + hdivider)
  }

  label.ClearAnchors()
  label.SetAnchor(TOPLEFT, control, TOPLEFT, 0, 3)
  label.SetAnchor(TOPRIGHT, control, TOPRIGHT, 0, 3)
  label.SetMaxLineCount(1)

  label.SetHidden(false)
  control.nameLabel = label

  control.isHeader = true
  control.item = control
  control.SetMouseEnabled(false)

  if (checkbox !== undefined) {
    checkbox.SetHidden(true)
    checkbox.SetMouseEnabled(false)
  }

  if (divider !== undefined) {
    divider.ClearAnchors()
    divider.SetAnchor(TOPLEFT, label, BOTTOMLEFT, 0, 3)
    divider.SetAnchor(RIGHT, control, RIGHT, 0, 0, ANCHOR_CONSTRAINS_X)
  }
}

export function cleanupEntryHeights(this: void, items: readonly LcmMenuEntry[]): number {
  let wasDivider = true
  let height = 0
  for (let i = items.length - 1; i >= 0; i--) {
    const menuEntry = items[i]
    if (menuEntry === undefined) {
      continue
    }
    const item = menuEntry.item
    const isDivider = menuEntry.isDivider === true
    const hasCheckbox = menuEntry.checkbox !== undefined
    if (isDivider) {
      if (wasDivider || i === 0) {
        height = height + (item.storedHeight ?? 0)
        item.storedHeight = 0
        item.SetHidden(true)
      } else {
        item.SetHidden(false)
      }
      wasDivider = true
    } else {
      wasDivider = false
      if (hasCheckbox && menuEntry.checkbox !== undefined) {
        const storedHeightOfItem = item.storedHeight ?? 0
        const heightOfItem = item.GetHeight()
        const heightToCompare =
          storedHeightOfItem !== heightOfItem ? storedHeightOfItem : heightOfItem
        const heightOfCheckbox = menuEntry.checkbox.GetHeight()
        const checkboxHeightDiff = zo_clamp(heightToCompare - heightOfCheckbox, 0, heightToCompare)
        height = height + checkboxHeightDiff
      }
    }
  }
  return height
}
