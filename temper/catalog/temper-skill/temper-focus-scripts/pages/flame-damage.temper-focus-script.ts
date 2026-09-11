import type { TemperFocusScript } from "akasha/temper/catalog/temper-skill/temper-focus-scripts/temper-focus-script.page-type.types.ts"

export const flameDamage = {
  id: "01a05fce-2951-72e7-9213-d465d522cd50",
  type: "temper-focus-script",
  slug: "flame-damage",
  title: "Flame Damage",
  key: "flame-damage",
  icon: "/esoui/art/icons/scribing_primary_flame.dds",
  itemId: 204556,
  uespId: 8,
  slotType: "focus-slot",
} as const satisfies TemperFocusScript
