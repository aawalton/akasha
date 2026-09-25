import type { TemperPublicDungeon } from "akasha/temper/catalog/world/temper-public-dungeon/temper-public-dungeon.page-type.types.ts"

export const dg = {
  id: "01a0d8a1-6ee4-75c3-8afb-c16913bfa28c",
  type: "page-type/temper-public-dungeon",
  slug: "dg",
  title: "Deetra Grotto",
  key: "DG",
  esoZoneId: 1514,
  zoneKey: "SO",
  esoAchievementId: 4264,
  displayOrder: 34,
} as const satisfies TemperPublicDungeon
