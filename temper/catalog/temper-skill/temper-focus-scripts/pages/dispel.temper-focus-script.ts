import type { TemperFocusScript } from "akasha/temper/catalog/temper-skill/temper-focus-scripts/temper-focus-script.page-type.types.ts"

export const dispel = {
  id: "01a05fce-2951-7081-a3fa-0882b13ba0ac",
  type: "temper-focus-script",
  slug: "dispel",
  title: "Dispel",
  key: "dispel",
  icon: "/esoui/art/icons/scribing_primary_dispelled.dds",
  itemId: 204565,
  uespId: 17,
  slotType: "focus-slot",
} as const satisfies TemperFocusScript
