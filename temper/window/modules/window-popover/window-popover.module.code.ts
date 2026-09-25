import type { Rgb } from "akasha/design/interface/token/modules/color-shape/color-shape.module.code.ts"
import { drawSurface } from "akasha/temper/modules/surface-backdrop/surface-backdrop.module.code.ts"
import {
  colorText,
  styleText,
  type TextRole,
} from "akasha/temper/window/modules/text-style/text-style.module.code.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-lua-sandbox/eso-lua-sandbox.type-declaration.d.ts"

export interface PopoverLine {
  text: string
  role?: TextRole
  color?: Rgb
}

const POPOVER_NAME = "TemperPopover"

const PADDING = 12

const LINE_GAP = 4

const MAX_TEXT_WIDTH = 264

const POPOVER_LEVEL = 3

const DEFAULT_ROLE: TextRole = "body"

let popover: TopLevelWindow | undefined

const LABELS: LabelControl[] = []

function made(): TopLevelWindow {
  if (popover !== undefined) return popover
  const tlw = WINDOW_MANAGER.CreateTopLevelWindow(POPOVER_NAME)
  tlw.SetHidden(true)
  tlw.SetDrawTier(DT_HIGH)
  tlw.SetDrawLayer(DL_OVERLAY)
  tlw.SetClampedToScreen(true)
  tlw.SetTopmost(true)
  drawSurface(tlw, POPOVER_LEVEL)
  popover = tlw
  return tlw
}

function labelAt(tlw: TopLevelWindow, at: number): LabelControl {
  const held = LABELS[at]
  if (held !== undefined) return held
  const label = WINDOW_MANAGER.CreateControl(undefined, tlw, CT_LABEL)
  LABELS[at] = label
  return label
}

function oppositeOf(point: number): number {
  if (point === TOP) return BOTTOM
  if (point === BOTTOM) return TOP
  if (point === LEFT) return RIGHT
  if (point === RIGHT) return LEFT
  if (point === TOPLEFT) return BOTTOMRIGHT
  if (point === BOTTOMRIGHT) return TOPLEFT
  if (point === TOPRIGHT) return BOTTOMLEFT
  if (point === BOTTOMLEFT) return TOPRIGHT
  return CENTER
}

function linesOf(given: readonly (string | PopoverLine)[]): PopoverLine[] {
  const found: PopoverLine[] = []
  for (const one of given) {
    const line = typeof one === "string" ? { text: one } : one
    if (line.text !== "") found.push(line)
  }
  return found
}

export function showPopover(
  owner: Control,
  given: readonly (string | PopoverLine)[],
  point: number = BOTTOM,
  offsetX = 0,
  offsetY = 0,
  relativePoint?: number
): undefined {
  const tlw = made()
  const lines = linesOf(given)
  let widest = 0
  for (let at = 0; at < lines.length; at += 1) {
    const line = lines[at]
    if (line === undefined) continue
    const label = labelAt(tlw, at)
    styleText(label, line.role ?? DEFAULT_ROLE)
    if (line.color !== undefined) colorText(label, line.color)
    label.SetWidth(MAX_TEXT_WIDTH)
    label.SetText(line.text)
    widest = math.max(widest, math.min(label.GetTextWidth(), MAX_TEXT_WIDTH))
  }
  let top = PADDING
  for (let at = 0; at < LABELS.length; at += 1) {
    const label = LABELS[at]
    if (label === undefined) continue
    if (at >= lines.length) {
      label.SetHidden(true)
      continue
    }
    label.SetHidden(false)
    label.SetWidth(widest)
    label.ClearAnchors()
    label.SetAnchor(TOPLEFT, tlw, TOPLEFT, PADDING, top)
    top += label.GetTextHeight() + LINE_GAP
  }
  tlw.SetDimensions(widest + PADDING * 2, top - LINE_GAP + PADDING)
  tlw.ClearAnchors()
  const ownerPoint =
    relativePoint === undefined || relativePoint === 0 ? oppositeOf(point) : relativePoint
  tlw.SetAnchor(point, owner, ownerPoint, offsetX, offsetY)
  tlw.SetHidden(lines.length === 0)
  return undefined
}

export function hidePopover(): undefined {
  if (popover !== undefined) popover.SetHidden(true)
  return undefined
}
