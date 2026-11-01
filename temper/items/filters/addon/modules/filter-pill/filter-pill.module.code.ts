import type { Rgb } from "akasha/design/interface/token/modules/color-shape/color-shape.module.code.ts"
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

const PILL_FILL: Rgb = [0.227, 0.227, 0.227]

const PILL_HOVER_FILL: Rgb = [0.282, 0.282, 0.282]

const PRIMARY_TEXT: Rgb = [0.843, 0.843, 0.843]

const SECONDARY_TEXT: Rgb = [0.643, 0.643, 0.643]

const TERTIARY_TEXT: Rgb = [0.455, 0.455, 0.455]

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

const PANEL_RADIUS = 6

const PANEL_LEVEL = 1

const PANEL_FILL: Rgb = [0.18, 0.18, 0.18]

const NAME_FONT = "$(MEDIUM_FONT)|14"

const REMOVE_GLYPH = "×"

interface Pill {
  readonly area: Control
  readonly label: LabelControl
  readonly rects: readonly BackdropControl[]
  readonly chevron: boolean
}

function paintText(label: LabelControl | EditControl, color: Rgb): undefined {
  const [red, green, blue] = color
  label.SetColor(red, green, blue, OPAQUE)
  return undefined
}

function paintFill(rects: readonly BackdropControl[], color: Rgb): undefined {
  const [red, green, blue] = color
  for (const rect of rects) {
    rect.SetCenterColor(red, green, blue, OPAQUE)
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

function fillRects(parent: Control, color: Rgb, radius: number, level: number): BackdropControl[] {
  const rects: BackdropControl[] = []
  let lastInset = -1
  for (let step = 0; step <= radius; step += 1) {
    const rise = radius - step
    const inset = math.floor(radius - math.sqrt(radius * radius - rise * rise) + 0.5)
    if (inset === lastInset) continue
    lastInset = inset
    const rect = flatRect(parent, level)
    rect.SetAnchor(TOPLEFT, parent, TOPLEFT, inset, step)
    rect.SetAnchor(BOTTOMRIGHT, parent, BOTTOMRIGHT, -inset, -step)
    rects.push(rect)
  }
  paintFill(rects, color)
  return rects
}

function lightOnPointing(rects: readonly BackdropControl[], pointer: Control): undefined {
  pointer.SetHandler("OnMouseEnter", () => paintFill(rects, PILL_HOVER_FILL), HANDLER_NAME)
  pointer.SetHandler("OnMouseExit", () => paintFill(rects, PILL_FILL), HANDLER_NAME)
  return undefined
}

export function setPillText(pill: Pill, text: string): undefined {
  pill.label.SetText(text)
  const tail = pill.chevron ? CHEVRON_GAP + CHEVRON_SIZE : 0
  pill.area.SetWidth(PILL_PAD_X * 2 + pill.label.GetTextWidth() + tail)
  return undefined
}

function paintPill(area: Control, text: string, chevron: boolean, muted: boolean): Pill {
  area.SetHeight(PILL_HEIGHT)
  const rects = fillRects(area, PILL_FILL, PILL_RADIUS, PILL_LEVEL)
  const label = WINDOW_MANAGER.CreateControl(undefined, area, CT_LABEL)
  label.SetAnchor(LEFT, area, LEFT, PILL_PAD_X, 0)
  label.SetFont(PILL_FONT)
  label.SetMouseEnabled(false)
  paintText(label, muted ? SECONDARY_TEXT : PRIMARY_TEXT)
  if (chevron) {
    const mark = WINDOW_MANAGER.CreateControl(undefined, area, CT_TEXTURE)
    mark.SetTexture(CHEVRON_ART)
    mark.SetDimensions(CHEVRON_SIZE, CHEVRON_SIZE)
    mark.SetAnchor(RIGHT, area, RIGHT, -PILL_PAD_X, 0)
    mark.SetDesaturation(GREY)
    const [red, green, blue] = SECONDARY_TEXT
    mark.SetColor(red, green, blue, OPAQUE)
  }
  const pill: Pill = { area, label, rects, chevron }
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
  chevron: boolean,
  muted = false
): { container: Control; comboBox: ComboBox; pill: Pill } {
  const container = WINDOW_MANAGER.CreateControlFromVirtual(name, parent, "ZO_ComboBox")
  const pointer = hideComboArt(container)
  const pill = paintPill(container, text, chevron, muted)
  lightOnPointing(pill.rects, pointer)
  return { container, comboBox: ZO_ComboBox_ObjectFromContainer(container), pill }
}

export function staticPill(
  parent: Control,
  name: string,
  text: string
): { area: Control; pill: Pill } {
  const area = WINDOW_MANAGER.CreateControl(name, parent, CT_CONTROL)
  const pill = paintPill(area, text, false, false)
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
  const rects = fillRects(area, PILL_FILL, PILL_RADIUS, PILL_LEVEL)
  const edit = WINDOW_MANAGER.CreateControl(name, parent, CT_EDITBOX)
  edit.SetAnchor(TOPLEFT, area, TOPLEFT, PILL_PAD_X, EDIT_TOP)
  edit.SetAnchor(BOTTOMRIGHT, area, BOTTOMRIGHT, -PILL_PAD_X, 0)
  edit.SetFont(PILL_FONT)
  paintText(edit, PRIMARY_TEXT)
  const [red, green, blue] = TERTIARY_TEXT
  edit.SetDefaultTextColor(red, green, blue, OPAQUE)
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
  fillRects(panel, PANEL_FILL, PANEL_RADIUS, PANEL_LEVEL)
  return undefined
}

export function styleFilterName(label: LabelControl): LabelControl {
  label.SetFont(NAME_FONT)
  label.SetModifyTextType(MODIFY_TEXT_TYPE_UPPERCASE)
  label.SetMouseEnabled(false)
  paintText(label, SECONDARY_TEXT)
  return label
}

export function createRemoveMark(parent: Control, onRemove: (this: void) => void): LabelControl {
  const mark = WINDOW_MANAGER.CreateControl(undefined, parent, CT_LABEL)
  mark.SetFont(PILL_FONT)
  mark.SetText(REMOVE_GLYPH)
  paintText(mark, TERTIARY_TEXT)
  mark.SetMouseEnabled(true)
  mark.SetHandler("OnMouseEnter", () => paintText(mark, PRIMARY_TEXT), HANDLER_NAME)
  mark.SetHandler("OnMouseExit", () => paintText(mark, TERTIARY_TEXT), HANDLER_NAME)
  mark.SetHandler(
    "OnMouseUp",
    function (this: void, _control: Control, _button: number, upInside: boolean): undefined {
      if (upInside) onRemove()
    }
  )
  return mark
}
