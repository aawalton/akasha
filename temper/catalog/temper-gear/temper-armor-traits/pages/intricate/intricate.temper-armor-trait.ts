import type { TemperArmorTrait } from "akasha/temper/catalog/temper-gear/temper-armor-traits/temper-armor-trait.page-type.types.ts"

export const intricate = {
  id: "01a05fb2-1bcf-7a85-85c9-e404b16bdfbc",
  type: "temper-armor-trait",
  slug: "intricate",
  title: "Intricate",
  key: "intricate",
  effect: "Increases Inspiration from deconstruction",
  esoTraitConstantName: "ITEM_TRAIT_TYPE_ARMOR_INTRICATE",
  displayOrder: 11,
} as const satisfies TemperArmorTrait
