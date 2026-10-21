import type { TemperClassMastery } from "akasha/temper/catalog/skill/temper-class-mastery/temper-class-mastery.page-type.types.ts"

export const bountifulHarvest = {
  id: "01a15ea7-5fea-7063-a7d4-5e2e104e41f5",
  type: "page-type/temper-class-mastery",
  slug: "bountiful-harvest",
  title: "Bountiful Harvest",
  key: "bountiful-harvest",
  description:
    "Share in the spoils of nature's abundance.\n\nUpgrades rank 2 of Nature's Gift to grant you and your group members Major Heroism for 3 seconds and an additional 125 Magicka and Stamina, up to once every 2 seconds.",
  esoSkillId: 263523,
  class: "temper-class/warden",
  hashPlace: 34,
  createdAt: "2026-10-21T13:29:49.800Z",
  updatedAt: "2026-10-21T13:29:49.800Z",
} as const satisfies TemperClassMastery
