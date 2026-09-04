import type { TemperWeaponTrait } from "../../temper-weapon-trait.page-type.ts"

export const precise = {
  id: "019e5b8b-e54b-75fa-afc2-cfdd5f966f52",
  pageTypeSlug: "temper-weapon-trait",
  slug: "precise",
  title: "Precise",
  key: "precise",
  effect: "Increases Weapon and Spell Critical",
  material: "Ruby",
  esoTraitConstantName: "ITEM_TRAIT_TYPE_WEAPON_PRECISE",
  displayOrder: 7,
  effects: "jsonl",
  qualityValues: "jsonl",
} as const satisfies TemperWeaponTrait
