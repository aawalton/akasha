import type { TemperWeaponTrait } from "../../temper-weapon-trait.page-type.ts"

export const training = {
  id: "019e5b8b-e54d-7f3a-ba3f-f3821e48039e",
  pageTypeSlug: "temper-weapon-trait",
  slug: "training",
  title: "Training",
  key: "training",
  effect: "Increases Experience Gain (No Combat Effect)",
  material: "Carnelian",
  esoTraitConstantName: "ITEM_TRAIT_TYPE_WEAPON_TRAINING",
  displayOrder: 9,
  effects: "jsonl",
  qualityValues: "jsonl",
} as const satisfies TemperWeaponTrait
