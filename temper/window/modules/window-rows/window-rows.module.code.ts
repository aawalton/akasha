import {
  paintSurface,
  type SurfaceLevel,
} from "akasha/temper/modules/surface-backdrop/surface-backdrop.module.code.ts"
import {
  styleText,
  styleTextOverPlay,
} from "akasha/temper/window/modules/text-style/text-style.module.code.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-objects-01/eso-objects-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"

export type RowState = "rest" | "hover" | "selected"

export interface StatRow {
  row: Control
  label: LabelControl
  value: LabelControl
}

export const ROW_PADDING_X = 8

const ROW_PADDING_Y = 6

export const LINE_HEIGHT = 20

export const STAT_ROW_HEIGHT = LINE_HEIGHT + ROW_PADDING_Y * 2

export const HEADER_ROW_HEIGHT = 40

const PANEL_LEVEL: SurfaceLevel = 2

const HIGHLIGHT = "EsoUI/Art/Miscellaneous/listItem_highlight.dds"

const SELECTED_HIGHLIGHT = "EsoUI/Art/Miscellaneous/listItem_selectedHighlight.dds"

const HIGHLIGHT_BOTTOM = 0.625

const SHOWN = 1

const HIDDEN = 0

const CLEAR = 0

const ABOVE_WINDOW = 1

function underContent(backdrop: BackdropControl): BackdropControl {
  backdrop.SetDrawLayer(DL_BACKGROUND)
  backdrop.SetDrawLevel(ABOVE_WINDOW)
  return backdrop
}

export function drawPanel(
  parent: Control,
  name: string | undefined,
  from: Control,
  to: Control
): BackdropControl {
  const panel = paintPanel(WINDOW_MANAGER.CreateControl(name, parent, CT_BACKDROP))
  panel.SetAnchor(TOPLEFT, from, TOPLEFT, 0, 0)
  panel.SetAnchor(BOTTOMRIGHT, to, BOTTOMRIGHT, 0, 0)
  return panel
}

export function paintPanel(backdrop: BackdropControl): BackdropControl {
  paintSurface(underContent(backdrop), PANEL_LEVEL)
  return backdrop
}

export function clearBackdrop(backdrop: BackdropControl): BackdropControl {
  underContent(backdrop).SetCenterColor(CLEAR, CLEAR, CLEAR, CLEAR)
  backdrop.SetEdgeColor(CLEAR, CLEAR, CLEAR, CLEAR)
  return backdrop
}

const LIGHTS = new LuaTable<Control, BackdropControl>()

const GLOWS = new LuaTable<BackdropControl, TextureControl>()

function glowOf(highlight: BackdropControl): TextureControl {
  const held = GLOWS.get(highlight)
  if (held !== undefined) return held
  const glow = WINDOW_MANAGER.CreateControl(undefined, highlight, CT_TEXTURE)
  glow.SetAnchorFill()
  glow.SetTextureCoords(0, 1, 0, HIGHLIGHT_BOTTOM)
  GLOWS.set(highlight, glow)
  return glow
}

function drawRowHighlight(row: Control): BackdropControl {
  const highlight = clearBackdrop(WINDOW_MANAGER.CreateControl(undefined, row, CT_BACKDROP))
  highlight.SetAnchorFill()
  paintRowState(highlight, "rest")
  LIGHTS.set(row, highlight)
  return highlight
}

export function rowHighlight(row: Control): BackdropControl {
  return LIGHTS.get(row) ?? drawRowHighlight(row)
}

export function paintRowHover(row: Control, over: boolean): undefined {
  paintRowState(rowHighlight(row), over ? "hover" : "rest")
  return undefined
}

export function paintRowState(highlight: BackdropControl, state: RowState): undefined {
  const glow = glowOf(highlight)
  glow.SetTexture(state === "selected" ? SELECTED_HIGHLIGHT : HIGHLIGHT)
  glow.SetAlpha(state === "rest" ? HIDDEN : SHOWN)
  return undefined
}

export function buildStatRow(parent: Control, name: string, overPlay = false): StatRow {
  const row = WINDOW_MANAGER.CreateControl(name, parent, CT_CONTROL)
  row.SetHeight(STAT_ROW_HEIGHT)
  const label = WINDOW_MANAGER.CreateControl("$(parent)Label", row, CT_LABEL)
  label.SetAnchor(LEFT, row, LEFT, ROW_PADDING_X, 0)
  const value = WINDOW_MANAGER.CreateControl("$(parent)Value", row, CT_LABEL)
  value.SetAnchor(RIGHT, row, RIGHT, -ROW_PADDING_X, 0)
  value.SetHorizontalAlignment(TEXT_ALIGN_RIGHT)
  const style = overPlay ? styleTextOverPlay : styleText
  style(label, "body")
  style(value, "number")
  return { row, label, value }
}
