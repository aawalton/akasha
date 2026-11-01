import type { Rgb } from "akasha/design/interface/token/modules/color-shape/color-shape.module.code.ts"
import { drawPanelBackground } from "akasha/temper/modules/surface-backdrop/surface-backdrop.module.code.ts"
import { colorOf } from "akasha/temper/window/modules/text-style/text-style.module.code.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-19/eso-enums-19.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-objects-01/eso-objects-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui-3/eso-ui-3.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"

export const PILL_HEIGHT = 24

export const PILL_GAP = 6

const PILL_PAD_X = 10

const PILL_RADIUS = 5

const PILL_LEVEL = 2

const PILL_FONT = "$(MEDIUM_FONT)|16"

const LIGHT: Rgb = [1, 1, 1]

const PILL_FILL_ALPHA = 0.08

const PILL_HOVER_ALPHA = 0.14

const MUTED_ALPHA = 0.55

const CHEVRON_ART = "EsoUI/Art/Buttons/scrollbox_downArrow_up.dds"

const CHEVRON_SIZE = 12

const CHEVRON_GAP = 4

const GREY = 1

const OPAQUE = 1

const UNSEEN = 0

const NO_EDGE = 0

const EDIT_TOP = 2

const MAX_INPUT_CHARS = 64

const HANDLER_NAME = "TemperFilterPill"

const NAME_FONT = "$(MEDIUM_FONT)|14"

const REMOVE_GLYPH = "×"

interface Pill {
  readonly area: Control
  readonly label: LabelControl
  readonly rects: readonly BackdropControl[]
  readonly mark: TextureControl | undefined
}

function paintText(
  label: LabelControl | EditControl | TextureControl,
  color: Rgb,
  alpha = OPAQUE
): undefined {
  const [red, green, blue] = color
  label.SetColor(red, green, blue, alpha)
  return undefined
}

function paintFill(rects: readonly BackdropControl[], alpha: number): undefined {
  const [red, green, blue] = LIGHT
  for (const rect of rects) {
    rect.SetCenterColor(red, green, blue, alpha)
  }
  return undefined
}

function flatRect(parent: Control, level: number): BackdropControl {
  const rect = WINDOW_MANAGER.CreateControl(undefined, parent, CT_BACKDROP)
  rect.SetCenterTexture(undefined)
  rect.SetEdgeTexture(undefined, 1, 1, NO_EDGE)
  rect.SetEdgeColor(NO_EDGE, NO_EDGE, NO_EDGE, NO_EDGE)
  rect.SetInsets(NO_EDGE, NO_EDGE, NO_EDGE, NO_EDGE)
  rect.SetDrawLayer(DL_BACKGROUND)
  rect.SetDrawLevel(level)
  return rect
}

function cornerInset(radius: number, row: number): number {
  const rise = radius - row
  return math.floor(radius - math.sqrt(radius * radius - rise * rise) + 0.5)
}

function strip(
  parent: Control,
  inset: number,
  top: boolean,
  row: number,
  height: number
): BackdropControl {
  const rect = flatRect(parent, PILL_LEVEL)
  const offset = top ? row : -row
  const near = top ? TOPLEFT : BOTTOMLEFT
  const far = top ? TOPRIGHT : BOTTOMRIGHT
  rect.SetAnchor(near, parent, near, inset, offset)
  rect.SetAnchor(far, parent, far, -inset, offset)
  rect.SetHeight(height)
  return rect
}

function fillRects(parent: Control, radius: number): BackdropControl[] {
  const rects: BackdropControl[] = []
  let row = 0
  while (row < radius) {
    const inset = cornerInset(radius, row)
    let next = row + 1
    while (next < radius && cornerInset(radius, next) === inset) next += 1
    rects.push(strip(parent, inset, true, row, next - row))
    rects.push(strip(parent, inset, false, row, next - row))
    row = next
  }
  const middle = flatRect(parent, PILL_LEVEL)
  middle.SetAnchor(TOPLEFT, parent, TOPLEFT, 0, radius)
  middle.SetAnchor(BOTTOMRIGHT, parent, BOTTOMRIGHT, 0, -radius)
  rects.push(middle)
  paintFill(rects, PILL_FILL_ALPHA)
  return rects
}

function paintMark(mark: TextureControl | undefined, pointed: boolean): undefined {
  if (mark === undefined) return undefined
  if (pointed) return paintText(mark, colorOf("heading"))
  return paintText(mark, colorOf("body"), MUTED_ALPHA)
}

function lightOnPointing(
  rects: readonly BackdropControl[],
  pointer: Control,
  mark?: TextureControl
): undefined {
  pointer.SetHandler(
    "OnMouseEnter",
    () => {
      paintFill(rects, PILL_HOVER_ALPHA)
      paintMark(mark, true)
    },
    HANDLER_NAME
  )
  pointer.SetHandler(
    "OnMouseExit",
    () => {
      paintFill(rects, PILL_FILL_ALPHA)
      paintMark(mark, false)
    },
    HANDLER_NAME
  )
  return undefined
}

export function setPillText(pill: Pill, text: string): undefined {
  pill.label.SetText(text)
  const tail = pill.mark === undefined ? 0 : CHEVRON_GAP + CHEVRON_SIZE
  pill.area.SetWidth(PILL_PAD_X * 2 + pill.label.GetTextWidth() + tail)
  return undefined
}

function chevronMark(area: Control): TextureControl {
  const mark = WINDOW_MANAGER.CreateControl(undefined, area, CT_TEXTURE)
  mark.SetTexture(CHEVRON_ART)
  mark.SetDimensions(CHEVRON_SIZE, CHEVRON_SIZE)
  mark.SetAnchor(RIGHT, area, RIGHT, -PILL_PAD_X, 0)
  mark.SetDesaturation(GREY)
  paintMark(mark, false)
  return mark
}

function paintPill(area: Control, text: string, chevron: boolean): Pill {
  area.SetHeight(PILL_HEIGHT)
  const rects = fillRects(area, PILL_RADIUS)
  const label = WINDOW_MANAGER.CreateControl(undefined, area, CT_LABEL)
  label.SetAnchor(LEFT, area, LEFT, PILL_PAD_X, 0)
  label.SetFont(PILL_FONT)
  label.SetMouseEnabled(false)
  paintText(label, colorOf("body"))
  const mark = chevron ? chevronMark(area) : undefined
  const pill: Pill = { area, label, rects, mark }
  setPillText(pill, text)
  return pill
}

function hideComboArt(container: Control): Control {
  let pointer: Control = container
  for (let at = 1; at <= container.GetNumChildren(); at += 1) {
    const child = container.GetChild<Control>(at)
    if (child === undefined) continue
    if (child.GetType() === CT_BUTTON) {
      child.SetAlpha(UNSEEN)
      child.ClearAnchors()
      child.SetAnchorFill()
      pointer = child
    } else {
      child.SetHidden(true)
    }
  }
  return pointer
}

export function comboPill(
  parent: Control,
  name: string,
  text: string,
  chevron: boolean
): { container: Control; comboBox: ComboBox; pill: Pill } {
  const container = WINDOW_MANAGER.CreateControlFromVirtual(name, parent, "ZO_ComboBox")
  const pointer = hideComboArt(container)
  const pill = paintPill(container, text, chevron)
  lightOnPointing(pill.rects, pointer, pill.mark)
  return { container, comboBox: ZO_ComboBox_ObjectFromContainer(container), pill }
}

export function staticPill(
  parent: Control,
  name: string,
  text: string
): { area: Control; pill: Pill } {
  const area = WINDOW_MANAGER.CreateControl(name, parent, CT_CONTROL)
  const pill = paintPill(area, text, false)
  return { area, pill }
}

export function editPill(
  parent: Control,
  name: string,
  width: number,
  placeholder: string
): { area: Control; edit: EditControl } {
  const area = WINDOW_MANAGER.CreateControl(`${name}Pill`, parent, CT_CONTROL)
  area.SetDimensions(width, PILL_HEIGHT)
  const rects = fillRects(area, PILL_RADIUS)
  const edit = WINDOW_MANAGER.CreateControl(name, parent, CT_EDITBOX)
  edit.SetAnchor(TOPLEFT, area, TOPLEFT, PILL_PAD_X, EDIT_TOP)
  edit.SetAnchor(BOTTOMRIGHT, area, BOTTOMRIGHT, -PILL_PAD_X, 0)
  edit.SetFont(PILL_FONT)
  const cream = colorOf("body")
  paintText(edit, cream)
  const [red, green, blue] = cream
  edit.SetDefaultTextColor(red, green, blue, MUTED_ALPHA)
  edit.SetDefaultText(placeholder)
  edit.SetMaxInputChars(MAX_INPUT_CHARS)
  edit.SetMouseEnabled(true)
  edit.SetHandler("OnMouseUp", function (this: void): undefined {
    edit.TakeFocus()
  })
  lightOnPointing(rects, edit)
  return { area, edit }
}

export function fillPanel(panel: Control): undefined {
  drawPanelBackground(panel)
  return undefined
}

export function styleFilterName(label: LabelControl): LabelControl {
  label.SetFont(NAME_FONT)
  label.SetModifyTextType(MODIFY_TEXT_TYPE_UPPERCASE)
  label.SetMouseEnabled(false)
  paintText(label, colorOf("heading"))
  return label
}

export function createRemoveMark(parent: Control, onRemove: (this: void) => void): LabelControl {
  const mark = WINDOW_MANAGER.CreateControl(undefined, parent, CT_LABEL)
  mark.SetFont(PILL_FONT)
  mark.SetText(REMOVE_GLYPH)
  paintText(mark, colorOf("body"), MUTED_ALPHA)
  mark.SetMouseEnabled(true)
  mark.SetHandler("OnMouseEnter", () => paintText(mark, colorOf("heading")), HANDLER_NAME)
  mark.SetHandler("OnMouseExit", () => paintText(mark, colorOf("body"), MUTED_ALPHA), HANDLER_NAME)
  mark.SetHandler(
    "OnMouseUp",
    function (this: void, _control: Control, _button: number, upInside: boolean): undefined {
      if (upInside) onRemove()
    }
  )
  return mark
}
