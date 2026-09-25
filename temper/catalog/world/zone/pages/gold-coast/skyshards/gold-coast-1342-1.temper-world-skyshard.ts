import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const goldCoast13421 = {
  id: "01a0d5df-9143-76d6-b5eb-63195af9ef18",
  type: "page-type/temper-world-skyshard",
  slug: "gold-coast-1342-1",
  title: "Gold Coast skyshard 1 of achievement 1342",
  esoAchievementId: 1342,
  shardNumber: 1,
  worldZone: "temper-world-zone/gold-coast",
  mapPositions: [
    { mapFolder: "darkbrotherhood", mapTile: "goldcoast_base", mapX: 0.255, mapY: 0.5822 },
  ],
} as const satisfies TemperWorldSkyshard
