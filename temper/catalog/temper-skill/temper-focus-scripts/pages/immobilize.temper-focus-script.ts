import type { TemperFocusScript } from "akasha/temper/catalog/temper-skill/temper-focus-scripts/temper-focus-script.page-type.types.ts"

export const immobilize = {
  id: "01a05fce-2952-78e9-98d0-98408c0e9369",
  type: "temper-focus-script",
  slug: "immobilize",
  title: "Immobilize",
  key: "immobilize",
  icon: "/esoui/art/icons/scribing_primary_immobilized.dds",
  itemId: 204563,
  uespId: 15,
  slotType: "focus-slot",
} as const satisfies TemperFocusScript
