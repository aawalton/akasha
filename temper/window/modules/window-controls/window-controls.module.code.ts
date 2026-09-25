import type { Rgb } from "akasha/design/interface/token/modules/color-shape/color-shape.module.code.ts"
import { YELLOW } from "akasha/design/interface/token/modules/semantic-color/semantic-color.module.code.ts"
import {
  SURFACE_0,
  SURFACE_1,
  SURFACE_2,
  SURFACE_3,
  SURFACE_4,
} from "akasha/design/interface/token/modules/surface-color/surface-color.module.code.ts"
import {
  TEXT_PRIMARY,
  TEXT_SECONDARY,
  TEXT_TERTIARY,
} from "akasha/design/interface/token/modules/text-color/text-color.module.code.ts"
import {
  paintSurface,
  type SurfaceLevel,
} from "akasha/temper/modules/surface-backdrop/surface-backdrop.module.code.ts"
import {
  fontPathOf,
  styleText,
} from "akasha/temper/window/modules/text-style/text-style.module.code.ts"
import "akasha/temper/eso/type/eso-enums-17/eso-enums-17.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-extra/eso-extra.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-objects-01/eso-objects-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"

export type ButtonVariant = "primary" | "secondary" | "tertiary" | "accent"

type ControlState = "rest" | "hover" | "pressed" | "chosen"

export const CONTROL_HEIGHT = 32

export const CONTROL_PADDING_X = 12

const SCROLL_BAR_WIDTH = 10

const SLIDER_TRACK_HEIGHT = 6

const SLIDER_THUMB_SIZE = 16

const ACCENT_FILL = 0.15

const DISABLED = 0.38

const DROPDOWN_ARROW = 0.5

const OPAQUE = 1

const CLEAR = 0

const NO_TEXTURE = ""

const BENEATH_LEVEL = 2

const STATE_LEVEL = 3

const HANDLER_NAME = "TemperControlState"

const STATE_OPACITY: Readonly<Record<ControlState, number>> = {
  rest: 0,
  hover: 0.08,
  pressed: 0.12,
  chosen: 0.12,
}

const SURFACES: readonly Rgb[] = [SURFACE_0, SURFACE_1, SURFACE_2, SURFACE_3, SURFACE_4]

const VARIANT_TEXT: Readonly<Record<ButtonVariant, Rgb>> = {
  primary: TEXT_PRIMARY,
  secondary: TEXT_SECONDARY,
  tertiary: TEXT_TERTIARY,
  accent: YELLOW,
}

interface Lit {
  layer: BackdropControl
  color: Rgb
  chosen: boolean
}

const LIT = new LuaTable<Control, Lit>()

const STYLED = new LuaTable<Control, boolean>()

function above(level: SurfaceLevel, by: number): SurfaceLevel {
  return math.min(level + by, SURFACES.length - 1) as SurfaceLevel
}

function surfaceColorOf(level: SurfaceLevel): Rgb {
  return SURFACES[level] ?? SURFACE_4
}

function firstTime(control: Control): boolean {
  if (STYLED.get(control) === true) return false
  STYLED.set(control, true)
  return true
}

function beneath(backdrop: BackdropControl, drawLevel: number): BackdropControl {
  backdrop.SetEdgeColor(CLEAR, CLEAR, CLEAR, CLEAR)
  backdrop.SetEdgeTexture(undefined, 1, 1, 1)
  backdrop.SetCenterTexture(undefined)
  backdrop.SetInsets(CLEAR, CLEAR, CLEAR, CLEAR)
  backdrop.SetDrawLayer(DL_BACKGROUND)
  backdrop.SetDrawLevel(drawLevel)
  return backdrop
}

function tint(texture: TextureControl, color: Rgb): TextureControl {
  const [red, green, blue] = color
  texture.SetTexture(NO_TEXTURE)
  texture.SetColor(red, green, blue, OPAQUE)
  return texture
}

function paintState(control: Control, state: ControlState): undefined {
  const lit = LIT.get(control)
  if (lit === undefined) return undefined
  const [red, green, blue] = lit.color
  const shown = lit.chosen && state === "rest" ? "chosen" : state
  lit.layer.SetCenterColor(red, green, blue, STATE_OPACITY[shown])
  return undefined
}

function lightOnPointing(control: Control, color: Rgb): undefined {
  const layer = beneath(WINDOW_MANAGER.CreateControl(undefined, control, CT_BACKDROP), STATE_LEVEL)
  layer.SetAnchorFill()
  LIT.set(control, { layer, color, chosen: false })
  paintState(control, "rest")
  control.SetHandler("OnMouseEnter", () => paintState(control, "hover"), HANDLER_NAME)
  control.SetHandler("OnMouseExit", () => paintState(control, "rest"), HANDLER_NAME)
  control.SetHandler("OnMouseDown", () => paintState(control, "pressed"), HANDLER_NAME)
  control.SetHandler("OnMouseUp", () => paintState(control, "hover"), HANDLER_NAME)
  return undefined
}

function clearButtonArt(button: ButtonControl): undefined {
  button.SetNormalTexture(NO_TEXTURE)
  button.SetPressedTexture(NO_TEXTURE)
  button.SetMouseOverTexture(NO_TEXTURE)
  button.SetPressedMouseOverTexture(NO_TEXTURE)
  button.SetDisabledTexture(NO_TEXTURE)
  return undefined
}

export function styleButton(
  button: ButtonControl,
  variant: ButtonVariant,
  level: SurfaceLevel
): ButtonControl {
  if (!firstTime(button)) return button
  clearButtonArt(button)
  const fill = beneath(WINDOW_MANAGER.CreateControl(undefined, button, CT_BACKDROP), BENEATH_LEVEL)
  fill.SetAnchorFill()
  if (variant === "accent") {
    const [red, green, blue] = YELLOW
    fill.SetCenterColor(red, green, blue, ACCENT_FILL)
  } else if (variant === "tertiary") {
    fill.SetCenterColor(CLEAR, CLEAR, CLEAR, CLEAR)
  } else {
    paintSurface(fill, above(level, 1))
  }
  const [red, green, blue] = VARIANT_TEXT[variant]
  button.SetFont(fontPathOf("heading"))
  button.SetNormalFontColor(red, green, blue, OPAQUE)
  button.SetMouseOverFontColor(red, green, blue, OPAQUE)
  lightOnPointing(button, VARIANT_TEXT[variant])
  return button
}

export function buildButton(
  parent: Control,
  name: string | undefined,
  text: string,
  variant: ButtonVariant,
  level: SurfaceLevel
): ButtonControl {
  const button = WINDOW_MANAGER.CreateControl(name, parent, CT_BUTTON)
  button.SetText(text)
  styleButton(button, variant, level)
  const width = button.GetLabelControl().GetTextWidth() + CONTROL_PADDING_X * 2
  button.SetDimensions(width, CONTROL_HEIGHT)
  return button
}

export function setControlEnabled(control: Control, enabled: boolean): undefined {
  control.SetAlpha(enabled ? OPAQUE : DISABLED)
  control.SetMouseEnabled(enabled)
  return undefined
}

export function styleTab(tab: Control): Control {
  if (firstTime(tab)) lightOnPointing(tab, TEXT_PRIMARY)
  return tab
}

export function setTabChosen(tab: Control, chosen: boolean): undefined {
  const lit = LIT.get(tab)
  if (lit === undefined) return undefined
  lit.chosen = chosen
  paintState(tab, "rest")
  return undefined
}

export function paintField(backdrop: BackdropControl, level: SurfaceLevel): BackdropControl {
  paintSurface(beneath(backdrop, BENEATH_LEVEL), above(level, 1))
  return backdrop
}

export function styleField(edit: EditControl, level: SurfaceLevel): EditControl {
  if (!firstTime(edit)) return edit
  edit.SetFont(fontPathOf("body"))
  const [red, green, blue] = TEXT_PRIMARY
  edit.SetColor(red, green, blue, OPAQUE)
  const [hintRed, hintGreen, hintBlue] = TEXT_TERTIARY
  edit.SetDefaultTextColor(hintRed, hintGreen, hintBlue, OPAQUE)
  const parent = edit.GetParent()
  if (parent !== undefined && parent.GetType() === CT_BACKDROP) {
    paintField(parent as BackdropControl, level)
  }
  const own = backdropBehind(edit)
  if (own !== undefined) paintField(own, level)
  return edit
}

function backdropBehind(control: Control): BackdropControl | undefined {
  const behind = control.GetNamedChild("BG")
  if (behind === undefined || behind.GetType() !== CT_BACKDROP) return undefined
  return behind as BackdropControl
}

export function styleIconTab(tab: Control): Control {
  if (STYLED.get(tab) === true) return tab
  const behind = backdropBehind(tab)
  if (behind !== undefined)
    beneath(behind, BENEATH_LEVEL).SetCenterColor(CLEAR, CLEAR, CLEAR, CLEAR)
  return styleTab(tab)
}

export function styleDropdown(container: Control, level: SurfaceLevel): Control {
  if (!firstTime(container)) return container
  const backdrop = container.GetNamedChild<BackdropControl>("BG")
  if (backdrop !== undefined) paintField(backdrop, level)
  const chosen = container.GetNamedChild<LabelControl>("SelectedItemText")
  if (chosen !== undefined) styleText(chosen, "body")
  container.GetNamedChild("OpenDropdown")?.SetAlpha(DROPDOWN_ARROW)
  return container
}

function clearTrack(slider: SliderControl, thumb: number, color: Rgb): undefined {
  slider.SetBackgroundTopTexture(NO_TEXTURE)
  slider.SetBackgroundMiddleTexture(NO_TEXTURE)
  slider.SetBackgroundBottomTexture(NO_TEXTURE)
  slider.SetThumbTexture(NO_TEXTURE, NO_TEXTURE, NO_TEXTURE, thumb, thumb)
  tint(slider.GetThumbTextureControl() as TextureControl, color)
  return undefined
}

export function styleScrollBar(bar: SliderControl, level: SurfaceLevel): SliderControl {
  if (!firstTime(bar)) return bar
  clearTrack(bar, SCROLL_BAR_WIDTH, surfaceColorOf(above(level, 2)))
  bar.SetWidth(SCROLL_BAR_WIDTH)
  bar.GetNamedChild("Up")?.SetHidden(true)
  bar.GetNamedChild("Down")?.SetHidden(true)
  return bar
}

export function styleSlider(slider: SliderControl, level: SurfaceLevel): SliderControl {
  if (!firstTime(slider)) return slider
  clearTrack(slider, SLIDER_THUMB_SIZE, YELLOW)
  const track = paintField(WINDOW_MANAGER.CreateControl(undefined, slider, CT_BACKDROP), level)
  track.SetAnchor(LEFT, slider, LEFT, 0, 0)
  track.SetAnchor(RIGHT, slider, RIGHT, 0, 0)
  track.SetHeight(SLIDER_TRACK_HEIGHT)
  return slider
}

function isScrollBar(control: Control): boolean {
  return control.GetNamedChild("Up") !== undefined && control.GetNamedChild("Down") !== undefined
}

export function styleControlsUnder(root: Control, level: SurfaceLevel): undefined {
  for (let at = 1; at <= root.GetNumChildren(); at += 1) {
    const child = root.GetChild<Control>(at)
    if (child === undefined) continue
    const kind = child.GetType()
    if (kind === CT_EDITBOX) {
      styleField(child as EditControl, level)
      continue
    }
    if (kind === CT_SLIDER) {
      if (isScrollBar(child)) styleScrollBar(child as SliderControl, level)
      else styleSlider(child as SliderControl, level)
      continue
    }
    if (child.GetNamedChild("OpenDropdown") !== undefined) {
      styleDropdown(child, level)
      continue
    }
    if (kind === CT_BUTTON && backdropBehind(child) !== undefined) {
      styleIconTab(child)
      continue
    }
    styleControlsUnder(child, level)
  }
  return undefined
}
