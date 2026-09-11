import type { TemperFocusScript } from "akasha/temper/catalog/temper-skill/temper-focus-scripts/temper-focus-script.page-type.types.ts"

export const bleedDamage = {
  id: "01a05fce-2950-7e3d-9043-e3769bffcb04",
  type: "temper-focus-script",
  slug: "bleed-damage",
  title: "Bleed Damage",
  key: "bleed-damage",
  icon: "/esoui/art/icons/scribing_primary_bleeding.dds",
  itemId: 204552,
  uespId: 4,
  slotType: "focus-slot",
} as const satisfies TemperFocusScript
