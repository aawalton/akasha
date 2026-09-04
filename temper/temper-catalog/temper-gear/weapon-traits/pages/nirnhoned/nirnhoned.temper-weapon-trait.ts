import type { TemperWeaponTrait } from "../../temper-weapon-trait.page-type.ts"

export const nirnhoned = {
  id: "019e5b8b-e547-7d4a-8306-4568b26afcec",
  pageTypeSlug: "temper-weapon-trait",
  slug: "nirnhoned",
  title: "Nirnhoned",
  key: "nirnhoned",
  effect: "Increases Weapon and Spell Damage",
  material: "Fortified Nirncrux",
  esoTraitConstantName: "ITEM_TRAIT_TYPE_WEAPON_NIRNHONED",
  displayOrder: 5,
  qualityValues: "jsonl",
} as const satisfies TemperWeaponTrait
