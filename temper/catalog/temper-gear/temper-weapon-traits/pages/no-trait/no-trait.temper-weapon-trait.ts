import type { TemperWeaponTrait } from "akasha/temper/catalog/temper-gear/temper-weapon-traits/temper-weapon-trait.page-type.types.ts"

export const noTrait = {
  id: "019e5b8b-e538-730b-9a28-925447bbe2fb",
  type: "temper-weapon-trait",
  slug: "no-trait",
  title: "No Trait",
  key: "no-trait",
  esoTraitConstantName: "ITEM_TRAIT_TYPE_NONE",
  displayOrder: 0,
} as const satisfies TemperWeaponTrait
