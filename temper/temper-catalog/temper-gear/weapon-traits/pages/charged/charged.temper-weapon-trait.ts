import type { TemperWeaponTrait } from "../../temper-weapon-trait.page-type.ts"

export const charged = {
  id: "019e5b8b-e53c-79f0-81dc-92d792e3fb6f",
  pageTypeSlug: "temper-weapon-trait",
  slug: "charged",
  title: "Charged",
  key: "charged",
  effect: "Increases Status Effect Chance",
  material: "Amethyst",
  esoTraitConstantName: "ITEM_TRAIT_TYPE_WEAPON_CHARGED",
  displayOrder: 1,
  effects: "jsonl",
  qualityValues: "jsonl",
} as const satisfies TemperWeaponTrait
