import type { TemperPotionCrown } from "../../temper-potion-crown.page-type.ts"

export const crownTriRestorationPotion = {
  id: "019e21f5-7534-7436-a51b-5d921f4e306f",
  pageTypeSlug: "temper-potion-crown",
  slug: "crown-tri-restoration-potion",
  title: "Crown Tri-Restoration Potion",
  key: "crown-tri-restoration-potion",
  description:
    "Restore 9206 Health, 7582 Magicka, and 7582 Stamina immediately. Grants Major Fortitude, Major Intellect, and Major Endurance which increase your Health Recovery, Magicka Recovery, and Stamina Recovery by 30% for 36.3 seconds.",
  displayOrder: 0,
  icon: "/esoui/art/icons/crownpotion_trires.dds",
  itemId: 64710,
  categoryId: "potions",
  subcategoryId: "crown",
  level: "Scaled",
  seconds: 36.3,
  effects: "jsonl",
} as const satisfies TemperPotionCrown
