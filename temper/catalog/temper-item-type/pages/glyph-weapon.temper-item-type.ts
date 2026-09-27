import type { TemperItemType } from "akasha/temper/catalog/temper-item-type/temper-item-type.page-type.types.ts"

export const glyphWeapon = {
  id: "01a0e10a-1c75-73f4-a5ef-bdbd006e2d78",
  type: "page-type/temper-item-type",
  slug: "glyph-weapon",
  title: "Glyph (Weapon)",
  esoItemTypeNumber: 20,
} as const satisfies TemperItemType
