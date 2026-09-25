import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const goldCoast13423 = {
  id: "01a0d5df-9143-7eed-ae1a-fb5ea7a487de",
  type: "page-type/temper-world-skyshard",
  slug: "gold-coast-1342-3",
  title: "Gold Coast skyshard 3 of achievement 1342",
  esoAchievementId: 1342,
  shardNumber: 3,
  worldZone: "temper-world-zone/gold-coast",
  mapPositions: [
    { mapFolder: "darkbrotherhood", mapTile: "goldcoast_base", mapX: 0.8568, mapY: 0.5078 },
  ],
} as const satisfies TemperWorldSkyshard
