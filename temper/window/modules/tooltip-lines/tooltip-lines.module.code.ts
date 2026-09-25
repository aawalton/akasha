import "akasha/temper/eso/type/eso-api-2/eso-api-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-01/eso-enums-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-07/eso-enums-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-19/eso-enums-19.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-08/eso-functions-08.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lib-sets-ui/eso-lib-sets-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-objects-01/eso-objects-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-2/eso-ui-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-writ-tooltip/eso-writ-tooltip.type-declaration.d.ts"

export interface TooltipLine {
  readonly text: string
  readonly color?: string
}

export interface TooltipItem {
  readonly link: string
  readonly bagId?: number
  readonly slotIndex?: number
}

export type TooltipLines = (this: void, item: TooltipItem) => readonly TooltipLine[]

interface GamepadItemTooltip {
  AcquireSection: (this: GamepadItemTooltip, style: unknown) => WritGamepadTooltipSection
  GetStyle: (this: GamepadItemTooltip, styleName: string) => unknown
  AddSection: (this: GamepadItemTooltip, section: WritGamepadTooltipSection) => void
  LayoutBagItem: (
    this: GamepadItemTooltip,
    bagId: number,
    slotIndex: number,
    ...rest: unknown[]
  ) => void
  LayoutItem: (this: GamepadItemTooltip, itemLink: string, ...rest: unknown[]) => void
}

const WRITERS: TooltipLines[] = []

let hooked = false

let layingBagItem = false

export function markedText(this: void, line: TooltipLine): string {
  return line.color === undefined ? line.text : `|c${line.color}${line.text}|r`
}

function textsFor(this: void, item: TooltipItem): string[] {
  const texts: string[] = []
  if (item.link === "") return texts
  for (const lines of WRITERS) {
    for (const line of lines(item)) texts.push(markedText(line))
  }
  return texts
}

function writeKeyboard(this: void, tooltip: TooltipControl, item: TooltipItem): undefined {
  for (const text of textsFor(item)) {
    tooltip.AddLine(text, "", 1, 1, 1, BOTTOM, MODIFY_TEXT_TYPE_NONE, TEXT_ALIGN_CENTER, true)
  }
  return undefined
}

function writeGamepad(this: void, tooltip: GamepadItemTooltip, item: TooltipItem): undefined {
  const texts = textsFor(item)
  if (texts.length === 0) return undefined
  const section = tooltip.AcquireSection(tooltip.GetStyle("bodySection"))
  for (const text of texts) section.AddLine(text, tooltip.GetStyle("bodyDescription"))
  tooltip.AddSection(section)
  return undefined
}

function hookKeyboard(this: void): undefined {
  const bagItem = ItemTooltip.SetBagItem
  ItemTooltip.SetBagItem = function (
    this: TooltipControl,
    bagId: number,
    slotIndex: number,
    displayFlags?: number
  ): undefined {
    bagItem.call(this, bagId, slotIndex, displayFlags)
    writeKeyboard(this, { link: GetItemLink(bagId, slotIndex), bagId, slotIndex })
  }
  const itemLink = ItemTooltip.SetLink
  ItemTooltip.SetLink = function (
    this: TooltipControl,
    link: string,
    ...rest: unknown[]
  ): undefined {
    itemLink.call(this, link, ...rest)
    writeKeyboard(this, { link })
  }
  const popupLink = PopupTooltip.SetLink
  PopupTooltip.SetLink = function (
    this: TooltipControl,
    link: string,
    ...rest: unknown[]
  ): undefined {
    popupLink.call(this, link, ...rest)
    writeKeyboard(this, { link })
  }
  return undefined
}

function isItemTooltip(this: void, tooltip: unknown): tooltip is GamepadItemTooltip {
  const kind = type(tooltip)
  if (kind !== "table" && kind !== "userdata") return false
  return (tooltip as { LayoutBagItem?: unknown }).LayoutBagItem !== undefined
}

function hookGamepad(this: void, kind: number): undefined {
  const tooltip: unknown = GAMEPAD_TOOLTIPS.GetTooltip(kind)
  if (!isItemTooltip(tooltip)) return undefined
  const bagItem = tooltip.LayoutBagItem
  tooltip.LayoutBagItem = function (
    this: GamepadItemTooltip,
    bagId: number,
    slotIndex: number,
    ...rest: unknown[]
  ): undefined {
    layingBagItem = true
    bagItem.call(this, bagId, slotIndex, ...rest)
    layingBagItem = false
    writeGamepad(this, { link: GetItemLink(bagId, slotIndex), bagId, slotIndex })
    return undefined
  }
  const item = tooltip.LayoutItem
  tooltip.LayoutItem = function (
    this: GamepadItemTooltip,
    link: string,
    ...rest: unknown[]
  ): undefined {
    item.call(this, link, ...rest)
    if (!layingBagItem) writeGamepad(this, { link })
    return undefined
  }
  return undefined
}

export function addTooltipLines(this: void, lines: TooltipLines): undefined {
  WRITERS.push(lines)
  if (hooked) return undefined
  hooked = true
  hookKeyboard()
  hookGamepad(GAMEPAD_LEFT_TOOLTIP)
  hookGamepad(GAMEPAD_RIGHT_TOOLTIP)
  return undefined
}
