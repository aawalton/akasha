import type { TemperPotionCrown } from "../../temper-potion-crown.page-type.ts"

export const goldCoastWarriorElixir = {
  id: "019e21f5-753a-7729-8bf8-b76b38588b3c",
  pageTypeSlug: "temper-potion-crown",
  slug: "gold-coast-warrior-elixir",
  title: "Gold Coast Warrior Elixir",
  key: "gold-coast-warrior-elixir",
  description:
    "Restore 7582 Stamina immediately. Grants Major Endurance which increases your Stamina Recovery by 30% for 36.3 seconds. Also grants Major Brutality and Major Savagery, increasing your Weapon Damage by 20% and Weapon Critical by 2629 for 36.3 seconds.",
  displayOrder: 2,
  icon: "/esoui/art/icons/crownpotion_warrior.dds",
  itemId: 112428,
  categoryId: "potions",
  subcategoryId: "crown",
  level: "Scaled",
  seconds: 36.3,
  effects: "jsonl",
} as const satisfies TemperPotionCrown
