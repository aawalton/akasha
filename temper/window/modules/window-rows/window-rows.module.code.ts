import { TEXT_PRIMARY } from "akasha/design/interface/token/modules/text-color/text-color.module.code.ts"
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

export const PANEL_PADDING = 12

export const ROW_PADDING_X = 8

export const ROW_PADDING_Y = 6

export const LINE_HEIGHT = 20

export const STAT_ROW_HEIGHT = LINE_HEIGHT + ROW_PADDING_Y * 2

export const HEADER_ROW_HEIGHT = 40

const PANEL_LEVEL: SurfaceLevel = 2

const STATE_OPACITY: Readonly<Record<RowState, number>> = {
  rest: 0,
  hover: 0.08,
  selected: 0.12,
}

const CLEAR = 0

function underContent(backdrop: BackdropControl): BackdropControl {
  backdrop.SetEdgeColor(CLEAR, CLEAR, CLEAR, CLEAR)
  backdrop.SetEdgeTexture(undefined, 1, 1, 1)
  backdrop.SetDrawLayer(DL_BACKGROUND)
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
  return backdrop
}

export function showChosen(highlight: BackdropControl | undefined, chosen: boolean): undefined {
  if (highlight === undefined) return undefined
  paintRowState(underContent(highlight), "selected")
  highlight.SetHidden(!chosen)
  return undefined
}

export function drawRowHighlight(row: Control): BackdropControl {
  const highlight = underContent(
    WINDOW_MANAGER.CreateControl("$(parent)Highlight", row, CT_BACKDROP)
  )
  highlight.SetAnchorFill()
  paintRowState(highlight, "rest")
  return highlight
}

export function paintRowState(highlight: BackdropControl, state: RowState): undefined {
  const [red, green, blue] = TEXT_PRIMARY
  highlight.SetCenterColor(red, green, blue, STATE_OPACITY[state])
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
