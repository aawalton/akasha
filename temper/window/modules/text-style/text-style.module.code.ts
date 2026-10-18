import type { Rgb } from "akasha/design/interface/token/modules/color-shape/color-shape.module.code.ts"
import {
  fontOf,
  type TypeFace,
  type TypeShadow,
  type TypeSize,
} from "akasha/temper/window/modules/type-scale/type-scale.module.code.ts"
import "akasha/temper/eso/type/eso-enums-07/eso-enums-07.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-19/eso-enums-19.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-world-map-window/eso-world-map-window.type-declaration.d.ts"

export type TextRole =
  | "heading"
  | "body"
  | "strong"
  | "muted"
  | "hint"
  | "label"
  | "number"
  | "accent"

interface RoleStyle {
  readonly size: TypeSize
  readonly face: TypeFace
  readonly shadow: TypeShadow
  readonly color: number
  readonly uppercase: boolean
  readonly font: string
}

const ROLES: Readonly<Record<TextRole, RoleStyle>> = {
  heading: {
    size: 18,
    face: "bold",
    shadow: "thick",
    color: INTERFACE_TEXT_COLOR_SELECTED,
    uppercase: true,
    font: "TemperFontHeading",
  },
  body: {
    size: 18,
    face: "medium",
    shadow: "thin",
    color: INTERFACE_TEXT_COLOR_NORMAL,
    uppercase: false,
    font: "TemperFontBody",
  },
  strong: {
    size: 18,
    face: "bold",
    shadow: "thin",
    color: INTERFACE_TEXT_COLOR_SELECTED,
    uppercase: false,
    font: "TemperFontStrong",
  },
  muted: {
    size: 18,
    face: "medium",
    shadow: "thin",
    color: INTERFACE_TEXT_COLOR_DEFAULT_TEXT,
    uppercase: false,
    font: "TemperFontMuted",
  },
  hint: {
    size: 16,
    face: "medium",
    shadow: "thin",
    color: INTERFACE_TEXT_COLOR_HINT,
    uppercase: false,
    font: "TemperFontHint",
  },
  label: {
    size: 18,
    face: "medium",
    shadow: "thin",
    color: INTERFACE_TEXT_COLOR_NORMAL,
    uppercase: true,
    font: "TemperFontLabel",
  },
  number: {
    size: 18,
    face: "medium",
    shadow: "thin",
    color: INTERFACE_TEXT_COLOR_NORMAL,
    uppercase: false,
    font: "TemperFontNumber",
  },
  accent: {
    size: 18,
    face: "bold",
    shadow: "thin",
    color: INTERFACE_TEXT_COLOR_CONTRAST,
    uppercase: false,
    font: "TemperFontAccent",
  },
}

const OPAQUE = 1

const OVER_PLAY_NAME = "OverPlay"

function pathOf(style: RoleStyle): string {
  return fontOf(style.size, style.face, style.shadow)
}

function overPlayPathOf(style: RoleStyle): string {
  return fontOf(style.size, style.face, "thick")
}

function rgbOf(style: RoleStyle): Rgb {
  const [red, green, blue] = GetInterfaceColor(INTERFACE_COLOR_TYPE_TEXT_COLORS, style.color)
  return [red, green, blue]
}

export function declareTextFonts(): undefined {
  for (const style of Object.values(ROLES)) {
    CreateFont(style.font, pathOf(style))
    CreateFont(`${style.font}${OVER_PLAY_NAME}`, overPlayPathOf(style))
  }
  return undefined
}

export function fontNameOf(role: TextRole): string {
  return ROLES[role].font
}

export function fontPathOf(role: TextRole): string {
  return pathOf(ROLES[role])
}

export function colorOf(role: TextRole): Rgb {
  return rgbOf(ROLES[role])
}

const FULL = 255

export function hexOf(role: TextRole): string {
  const [red, green, blue] = colorOf(role)
  return string.format(
    "%02X%02X%02X",
    math.floor(red * FULL + 0.5),
    math.floor(green * FULL + 0.5),
    math.floor(blue * FULL + 0.5)
  )
}

export function colorText(label: LabelControl, color: Rgb): LabelControl {
  const [red, green, blue] = color
  label.SetColor(red, green, blue, OPAQUE)
  return label
}

function paintRole(label: LabelControl, style: RoleStyle): undefined {
  colorText(label, rgbOf(style))
  label.SetModifyTextType(style.uppercase ? MODIFY_TEXT_TYPE_UPPERCASE : MODIFY_TEXT_TYPE_NONE)
  return undefined
}

export function styleText(label: LabelControl, role: TextRole): LabelControl {
  const style = ROLES[role]
  label.SetFont(pathOf(style))
  paintRole(label, style)
  return label
}

export function styleTextOverPlay(label: LabelControl, role: TextRole): LabelControl {
  const style = ROLES[role]
  label.SetFont(overPlayPathOf(style))
  paintRole(label, style)
  return label
}

const BY_FONT_NAME: Readonly<Record<string, RoleStyle>> = Object.fromEntries(
  Object.values(ROLES).flatMap((style) => [
    [style.font, style],
    [`${style.font}${OVER_PLAY_NAME}`, style],
  ])
)

export function colorTextsUnder(root: Control): undefined {
  for (let at = 1; at <= root.GetNumChildren(); at += 1) {
    const child = root.GetChild<Control>(at)
    if (child === undefined) continue
    if (child.GetType() === CT_LABEL) {
      const label = child as LabelControl
      const style = BY_FONT_NAME[label.GetFont()]
      if (style !== undefined) paintRole(label, style)
    }
    colorTextsUnder(child)
  }
  return undefined
}
