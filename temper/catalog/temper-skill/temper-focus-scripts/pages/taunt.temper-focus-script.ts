import type { TemperFocusScript } from "akasha/temper/catalog/temper-skill/temper-focus-scripts/temper-focus-script.page-type.types.ts"

export const taunt = {
  id: "01a05fce-2955-77f5-9883-c0788a9af087",
  type: "temper-focus-script",
  slug: "taunt",
  title: "Taunt",
  key: "taunt",
  icon: "/esoui/art/icons/scribing_primary_taunt.dds",
  itemId: 204560,
  uespId: 12,
  slotType: "focus-slot",
} as const satisfies TemperFocusScript
