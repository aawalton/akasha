import type { TemperWeaponTrait } from "akasha/temper/catalog/temper-gear/temper-weapon-traits/temper-weapon-trait.page-type.types.ts"

export const intricate = {
  id: "019e5b8b-e550-7816-bfce-025ca7c20d3e",
  type: "temper-weapon-trait",
  slug: "intricate",
  title: "Intricate",
  key: "intricate",
  effect: "Increases Inspiration from deconstruction",
  esoTraitConstantName: "ITEM_TRAIT_TYPE_WEAPON_INTRICATE",
  displayOrder: 11,
} as const satisfies TemperWeaponTrait
