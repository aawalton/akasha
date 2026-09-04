import type { TemperPotionDropped } from "../../temper-potion-dropped.page-type.ts"

export const essenceOfMagicka = {
  id: "019e21f5-bdb6-710e-9cd3-9e2950cf08bd",
  pageTypeSlug: "temper-potion-dropped",
  slug: "essence-of-magicka",
  title: "Essence of Magicka",
  key: "essence-of-magicka",
  description:
    "Restore 6066 Magicka immediately. Grants Major Intellect which increases your Magicka Regeneration by 30% for 22.1 seconds.",
  displayOrder: 1,
  icon: "/esoui/art/icons/consumable_potion_002_type_005.dds",
  itemId: 27037,
  level: "CP160",
  seconds: 22.1,
  effects: "jsonl",
} as const satisfies TemperPotionDropped
