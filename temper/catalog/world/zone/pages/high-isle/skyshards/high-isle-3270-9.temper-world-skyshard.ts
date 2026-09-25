import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const highIsle32709 = {
  id: "01a0d5de-f9bf-7e49-8c63-8870c3d80b88",
  type: "page-type/temper-world-skyshard",
  slug: "high-isle-3270-9",
  title: "High Isle skyshard 9 of achievement 3270",
  esoAchievementId: 3270,
  shardNumber: 9,
  worldZone: "temper-world-zone/high-isle",
  mapPositions: [
    { mapFolder: "systres", mapTile: "u34_systreszone_base", mapX: 0.8003, mapY: 0.2639 },
  ],
} as const satisfies TemperWorldSkyshard
