import type { TemperWeaponTrait } from "../../temper-weapon-trait.page-type.ts"

export const infused = {
  id: "019e5b8b-e545-787d-9a0a-68e27557df53",
  pageTypeSlug: "temper-weapon-trait",
  slug: "infused",
  title: "Infused",
  key: "infused",
  effect: "Increases Enchantment Effectiveness",
  material: "Jade",
  esoTraitConstantName: "ITEM_TRAIT_TYPE_WEAPON_INFUSED",
  displayOrder: 4,
  qualityValues: "jsonl",
} as const satisfies TemperWeaponTrait
