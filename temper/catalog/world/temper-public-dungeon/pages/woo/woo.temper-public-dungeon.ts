import type { TemperPublicDungeon } from "akasha/temper/catalog/world/temper-public-dungeon/temper-public-dungeon.page-type.types.ts"

export const woo = {
  id: "01a0d8a1-6ee4-7455-83e8-71e294c883ae",
  type: "page-type/temper-public-dungeon",
  slug: "woo",
  title: "Old Orsinium",
  key: "WOO",
  esoZoneId: 706,
  zoneKey: "WR",
  esoAchievementId: 1238,
  displayOrder: 18,
} as const satisfies TemperPublicDungeon
