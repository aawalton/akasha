import {
  colorOf,
  fontPathOf,
} from "akasha/temper/window/modules/text-style/text-style.module.code.ts"
import "akasha/temper/eso/type/eso-api/eso-api.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-objects-01/eso-objects-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"

type ButtonVariant = "default" | "text"

type ControlState = "rest" | "hover"

export const CONTROL_HEIGHT = 28

const BUTTON_PADDING_X = 16

const TEMPLATES: Readonly<Record<ButtonVariant, string>> = {
  default: "ZO_DefaultButton",
  text: "ZO_DefaultTextButton",
}

const HIGHLIGHT = "EsoUI/Art/Miscellaneous/listItem_highlight.dds"

const CHOSEN_HIGHLIGHT = "EsoUI/Art/Miscellaneous/listItem_selectedHighlight.dds"

const HIGHLIGHT_BOTTOM = 0.625

const FIELD_EDGE = "EsoUI/Art/ChatWindow/textEntry_edge.dds"

const FIELD_EDGE_WIDTH = 64

const FIELD_EDGE_HEIGHT = 8

const FIELD_CENTER = "EsoUI/Art/ChatWindow/textEntry_center.dds"

const FIELD_INSET = 8

const SHOWN = 1

const HIDDEN = 0

const UNTINTED = 1

const OPAQUE = 1

const HANDLER_NAME = "TemperControlState"

interface Lit {
  glow: TextureControl
  chosen: boolean
}

const LIT = new LuaTable<Control, Lit>()

const STYLED = new LuaTable<Control, boolean>()

function firstTime(control: Control): boolean {
  if (STYLED.get(control) === true) return false
  STYLED.set(control, true)
  return true
}

function paintState(control: Control, state: ControlState): undefined {
  const lit = LIT.get(control)
  if (lit === undefined) return undefined
  lit.glow.SetTexture(lit.chosen ? CHOSEN_HIGHLIGHT : HIGHLIGHT)
  lit.glow.SetAlpha(lit.chosen || state === "hover" ? SHOWN : HIDDEN)
  return undefined
}

function lightOnPointing(control: Control): undefined {
  const glow = WINDOW_MANAGER.CreateControl(undefined, control, CT_TEXTURE)
  glow.SetAnchorFill()
  glow.SetTextureCoords(0, 1, 0, HIGHLIGHT_BOTTOM)
  LIT.set(control, { glow, chosen: false })
  paintState(control, "rest")
  control.SetHandler("OnMouseEnter", () => paintState(control, "hover"), HANDLER_NAME)
  control.SetHandler("OnMouseExit", () => paintState(control, "rest"), HANDLER_NAME)
  return undefined
}

export function buildButton(
  parent: Control,
  name: string | undefined,
  text: string,
  variant: ButtonVariant
): ButtonControl {
  const button = WINDOW_MANAGER.CreateControlFromVirtual<ButtonControl>(
    name,
    parent,
    TEMPLATES[variant]
  )
  STYLED.set(button, true)
  button.SetText(text)
  const width = (button.GetLabelControl()?.GetTextWidth() ?? 0) + BUTTON_PADDING_X * 2
  button.SetDimensions(width, CONTROL_HEIGHT)
  return button
}

export function styleTab(tab: Control): Control {
  if (firstTime(tab)) lightOnPointing(tab)
  return tab
}

export function setTabChosen(tab: Control, chosen: boolean): undefined {
  const lit = LIT.get(tab)
  if (lit === undefined) return undefined
  lit.chosen = chosen
  paintState(tab, "rest")
  return undefined
}

export function paintField(backdrop: BackdropControl): BackdropControl {
  backdrop.SetCenterTexture(FIELD_CENTER)
  backdrop.SetCenterColor(UNTINTED, UNTINTED, UNTINTED, UNTINTED)
  backdrop.SetEdgeTexture(FIELD_EDGE, FIELD_EDGE_WIDTH, FIELD_EDGE_HEIGHT, FIELD_EDGE_HEIGHT)
  backdrop.SetEdgeColor(UNTINTED, UNTINTED, UNTINTED, UNTINTED)
  backdrop.SetInsets(FIELD_INSET, FIELD_INSET, -FIELD_INSET, -FIELD_INSET)
  return backdrop
}

function ownBackdrop(control: Control): BackdropControl | undefined {
  const behind = control.GetNamedChild("BG")
  if (behind === undefined || behind.GetType() !== CT_BACKDROP) return undefined
  return behind as BackdropControl
}

export function styleField(edit: EditControl): EditControl {
  if (!firstTime(edit)) return edit
  edit.SetFont(fontPathOf("body"))
  const [red, green, blue] = colorOf("body")
  edit.SetColor(red, green, blue, OPAQUE)
  const [hintRed, hintGreen, hintBlue] = colorOf("hint")
  edit.SetDefaultTextColor(hintRed, hintGreen, hintBlue, OPAQUE)
  const parent = edit.GetParent()
  if (parent !== undefined && parent.GetType() === CT_BACKDROP) {
    paintField(parent as BackdropControl)
  }
  const own = ownBackdrop(edit)
  if (own !== undefined) paintField(own)
  return edit
}

function hasText(button: ButtonControl): boolean {
  const text: unknown = button.GetLabelControl()?.GetText()
  return typeof text === "string" && text !== ""
}

function styleTextButton(button: ButtonControl): undefined {
  if (!firstTime(button)) return undefined
  ApplyTemplateToControl(button, TEMPLATES.default)
  return undefined
}

export function styleControlsUnder(root: Control): undefined {
  for (let at = 1; at <= root.GetNumChildren(); at += 1) {
    const child = root.GetChild<Control>(at)
    if (child === undefined) continue
    const kind = child.GetType()
    if (kind === CT_EDITBOX) {
      styleField(child as EditControl)
      continue
    }
    if (kind === CT_BUTTON && hasText(child as ButtonControl)) {
      styleTextButton(child as ButtonControl)
      continue
    }
    styleControlsUnder(child)
  }
  return undefined
}
