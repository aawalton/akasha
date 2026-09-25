import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const highIsle32707 = {
  id: "01a0d5de-f9bf-74a0-bfa5-6861ba25dfd8",
  type: "page-type/temper-world-skyshard",
  slug: "high-isle-3270-7",
  title: "High Isle skyshard 7 of achievement 3270",
  esoAchievementId: 3270,
  shardNumber: 7,
  worldZone: "temper-world-zone/high-isle",
  mapPositions: [
    { mapFolder: "systres", mapTile: "u34_systreszone_base", mapX: 0.5008, mapY: 0.6549 },
  ],
} as const satisfies TemperWorldSkyshard
