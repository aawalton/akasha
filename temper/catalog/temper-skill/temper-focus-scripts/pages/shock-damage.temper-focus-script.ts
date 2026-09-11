import type { TemperFocusScript } from "akasha/temper/catalog/temper-skill/temper-focus-scripts/temper-focus-script.page-type.types.ts"

export const shockDamage = {
  id: "01a05fce-2954-76fc-b4b7-83e6b975b207",
  type: "temper-focus-script",
  slug: "shock-damage",
  title: "Shock Damage",
  key: "shock-damage",
  icon: "/esoui/art/icons/scribing_primary_shock.dds",
  itemId: 204554,
  uespId: 6,
  slotType: "focus-slot",
} as const satisfies TemperFocusScript
