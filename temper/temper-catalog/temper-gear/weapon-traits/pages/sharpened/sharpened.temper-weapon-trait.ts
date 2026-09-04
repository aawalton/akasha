import type { TemperWeaponTrait } from "../../temper-weapon-trait.page-type.ts"

export const sharpened = {
  id: "019e5b8b-e54c-7a9d-9b2b-de0c4da3ca56",
  pageTypeSlug: "temper-weapon-trait",
  slug: "sharpened",
  title: "Sharpened",
  key: "sharpened",
  effect: "Increases Physical and Spell Penetration",
  material: "Fire Opal",
  esoTraitConstantName: "ITEM_TRAIT_TYPE_WEAPON_SHARPENED",
  displayOrder: 8,
  effects: "jsonl",
  qualityValues: "jsonl",
} as const satisfies TemperWeaponTrait
