import type { TemperWeaponTrait } from "akasha/temper/catalog/temper-gear/temper-weapon-traits/temper-weapon-trait.page-type.types.ts"

export const decisive = {
  id: "019e5b8b-e540-7c05-bac0-3b47430a460f",
  type: "temper-weapon-trait",
  slug: "decisive",
  title: "Decisive",
  key: "decisive",
  effect: "Increases Ultimate Gain",
  material: "Citrine",
  esoTraitConstantName: "ITEM_TRAIT_TYPE_WEAPON_DECISIVE",
  displayOrder: 2,
  qualityValues: "jsonl",
} as const satisfies TemperWeaponTrait
