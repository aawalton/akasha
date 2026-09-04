import type { TemperPotionDropped } from "../../temper-potion-dropped.page-type.ts"

export const essenceOfHealth = {
  id: "019e21f5-bdb2-75ed-8a74-8c81eb26af73",
  pageTypeSlug: "temper-potion-dropped",
  slug: "essence-of-health",
  title: "Essence of Health",
  key: "essence-of-health",
  description:
    "Restore 7352 Health immediately. Grants Major Fortitude which increases your Health Regeneration by 30% for 22.1 seconds.",
  displayOrder: 0,
  icon: "/esoui/art/icons/consumable_potion_001_type_005.dds",
  itemId: 27036,
  level: "CP160",
  seconds: 22.1,
  effects: "jsonl",
} as const satisfies TemperPotionDropped
