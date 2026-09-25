import type { TemperPublicDungeon } from "akasha/temper/catalog/world/temper-public-dungeon/temper-public-dungeon.page-type.types.ts"

export const go = {
  id: "01a0d8a1-6ee4-7086-8552-245050aa5765",
  type: "page-type/temper-public-dungeon",
  slug: "go",
  title: "Gorne",
  key: "GO",
  esoZoneId: 1415,
  zoneKey: "TP",
  esoAchievementId: 3658,
  displayOrder: 30,
} as const satisfies TemperPublicDungeon
