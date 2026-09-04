import type { TemperPotionDropped } from "../../temper-potion-dropped.page-type.ts"

export const essenceOfPotentStamina = {
  id: "019e21f5-bdc0-7210-86f1-c72a0e82c699",
  pageTypeSlug: "temper-potion-dropped",
  slug: "essence-of-potent-stamina",
  title: "Essence of Potent Stamina",
  key: "essence-of-potent-stamina",
  description:
    "Grants Major Brutality which increases your Weapon Damage by 20% for 22.1 seconds. Restore 6066 Stamina immediately. Grants Major Endurance which increases your Stamina Regeneration by 30% for 22.1 seconds.",
  displayOrder: 5,
  icon: "/esoui/art/icons/consumable_potion_003_type_005.dds",
  itemId: 176042,
  level: "CP160",
  seconds: 22.1,
  effects: "jsonl",
} as const satisfies TemperPotionDropped
