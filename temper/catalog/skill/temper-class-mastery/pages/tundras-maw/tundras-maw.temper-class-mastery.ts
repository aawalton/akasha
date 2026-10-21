import type { TemperClassMastery } from "akasha/temper/catalog/skill/temper-class-mastery/temper-class-mastery.page-type.types.ts"

export const tundrasMaw = {
  id: "01a15ea7-5fed-778b-b459-b31480765e65",
  type: "page-type/temper-class-mastery",
  slug: "tundras-maw",
  title: "Tundra's Maw",
  key: "tundras-maw",
  description:
    "Expose your enemies to unrelenting cold.\n\nUpgrades Chilled to also apply Major Brittle for 2.1 seconds, increasing their Critical Damage taken by 20%.",
  esoSkillId: 263519,
  class: "temper-class/warden",
  hashPlace: 30,
  createdAt: "2026-10-21T13:29:49.800Z",
  updatedAt: "2026-10-21T13:29:49.800Z",
} as const satisfies TemperClassMastery
