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
    font: "TemperFontBody",
  },
  hint: {
    size: "sm",
    weight: 400,
    family: "sans",
    color: TEXT_TERTIARY,
    uppercase: false,
    font: "TemperFontBody",
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

for (const style of Object.values(ROLES)) {
  CreateFont(style.font, fontOf(style.size, style.weight, style.family))
}

export function fontNameOf(role: TextRole): string {
  return ROLES[role].font
}

export function colorOf(role: TextRole): Rgb {
  return ROLES[role].color
}

export function colorText(label: LabelControl, color: Rgb): LabelControl {
  const [red, green, blue] = color
  label.SetColor(red, green, blue, OPAQUE)
  return label
}

export function styleText(label: LabelControl, role: TextRole): LabelControl {
  const style = ROLES[role]
  label.SetFont(style.font)
  colorText(label, style.color)
  label.SetModifyTextType(style.uppercase ? MODIFY_TEXT_TYPE_UPPERCASE : MODIFY_TEXT_TYPE_NONE)
  return label
}
