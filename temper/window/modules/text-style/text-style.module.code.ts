import type { Rgb } from "akasha/design/interface/token/modules/color-shape/color-shape.module.code.ts"
import { YELLOW } from "akasha/design/interface/token/modules/semantic-color/semantic-color.module.code.ts"
import {
  TEXT_PRIMARY,
  TEXT_SECONDARY,
  TEXT_TERTIARY,
} from "akasha/design/interface/token/modules/text-color/text-color.module.code.ts"
import {
  fontOf,
  type TypeFamily,
  type TypeSize,
  type TypeWeight,
} from "akasha/temper/window/modules/type-scale/type-scale.module.code.ts"
import "akasha/temper/eso/type/eso-enums-19/eso-enums-19.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-ui/eso-ui.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-world-map-window/eso-world-map-window.type-declaration.d.ts"

export type TextRole = "heading" | "body" | "muted" | "hint" | "label" | "number" | "accent"

interface RoleStyle {
  readonly size: TypeSize
  readonly weight: TypeWeight
  readonly family: TypeFamily
  readonly color: Rgb
  readonly uppercase: boolean
  readonly font: string
}

const ROLES: Readonly<Record<TextRole, RoleStyle>> = {
  heading: {
    size: "sm",
    weight: 500,
    family: "sans",
    color: TEXT_PRIMARY,
    uppercase: false,
    font: "TemperFontHeading",
  },
  body: {
    size: "sm",
    weight: 400,
    family: "sans",
    color: TEXT_PRIMARY,
    uppercase: false,
    font: "TemperFontBody",
  },
  muted: {
    size: "sm",
    weight: 400,
    family: "sans",
    color: TEXT_SECONDARY,
    uppercase: false,
    font: "TemperFontMuted",
  },
  hint: {
    size: "sm",
    weight: 400,
    family: "sans",
    color: TEXT_TERTIARY,
    uppercase: false,
    font: "TemperFontHint",
  },
  label: {
    size: "xs",
    weight: 500,
    family: "sans",
    color: TEXT_SECONDARY,
    uppercase: true,
    font: "TemperFontLabel",
  },
  number: {
    size: "sm",
    weight: 400,
    family: "mono",
    color: TEXT_PRIMARY,
    uppercase: false,
    font: "TemperFontNumber",
  },
  accent: {
    size: "sm",
    weight: 700,
    family: "sans",
    color: YELLOW,
    uppercase: false,
    font: "TemperFontAccent",
  },
}

const OPAQUE = 1

const OVER_PLAY_SHADOW = "soft-shadow-thick"

const OVER_PLAY_NAME = "OverPlay"

function overPlayPathOf(style: RoleStyle): string {
  return `${fontOf(style.size, style.weight, style.family)}|${OVER_PLAY_SHADOW}`
}

export function declareTextFonts(): undefined {
  for (const style of Object.values(ROLES)) {
    CreateFont(style.font, fontOf(style.size, style.weight, style.family))
    CreateFont(`${style.font}${OVER_PLAY_NAME}`, overPlayPathOf(style))
  }
  return undefined
}

export function fontNameOf(role: TextRole): string {
  return ROLES[role].font
}

export function fontPathOf(role: TextRole): string {
  const style = ROLES[role]
  return fontOf(style.size, style.weight, style.family)
}

export function colorOf(role: TextRole): Rgb {
  return ROLES[role].color
}

const FULL = 255

export function hexOf(role: TextRole): string {
  const [red, green, blue] = ROLES[role].color
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
  colorText(label, style.color)
  label.SetModifyTextType(style.uppercase ? MODIFY_TEXT_TYPE_UPPERCASE : MODIFY_TEXT_TYPE_NONE)
  return undefined
}

export function styleText(label: LabelControl, role: TextRole): LabelControl {
  const style = ROLES[role]
  label.SetFont(fontOf(style.size, style.weight, style.family))
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
