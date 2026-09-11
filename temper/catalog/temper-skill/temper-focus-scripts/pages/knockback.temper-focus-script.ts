import type { TemperFocusScript } from "akasha/temper/catalog/temper-skill/temper-focus-scripts/temper-focus-script.page-type.types.ts"

export const knockback = {
  id: "01a05fce-2952-71bf-87d4-98db92079013",
  type: "temper-focus-script",
  slug: "knockback",
  title: "Knockback",
  key: "knockback",
  icon: "/esoui/art/icons/scribing_primary_knockback.dds",
  itemId: 204561,
  uespId: 13,
  slotType: "focus-slot",
} as const satisfies TemperFocusScript
