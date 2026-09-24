import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const stonefalls3975 = {
  id: "01a0d5d9-b16f-7ece-9687-14625b4d255b",
  type: "page-type/temper-world-skyshard",
  slug: "stonefalls-397-5",
  title: "Stonefalls skyshard 5 of achievement 397",
  esoAchievementId: 397,
  shardNumber: 5,
  worldZone: "temper-world-zone/stonefalls",
  mapPositions: [
    { mapFolder: "stonefalls", mapTile: "stonefalls_base", mapX: 0.2535, mapY: 0.411 },
  ],
} as const satisfies TemperWorldSkyshard
