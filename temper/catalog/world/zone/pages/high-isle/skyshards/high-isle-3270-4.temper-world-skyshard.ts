import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const highIsle32704 = {
  id: "01a0d5de-f9bf-7b6c-a86a-623493ec6324",
  type: "page-type/temper-world-skyshard",
  slug: "high-isle-3270-4",
  title: "High Isle skyshard 4 of achievement 3270",
  esoAchievementId: 3270,
  shardNumber: 4,
  worldZone: "temper-world-zone/high-isle",
  mapPositions: [
    { mapFolder: "systres", mapTile: "u34_systreszone_base", mapX: 0.1439, mapY: 0.5668 },
  ],
} as const satisfies TemperWorldSkyshard
