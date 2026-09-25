import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const highIsle32705 = {
  id: "01a0d5de-f9bf-7c0a-b366-3e191c5a6703",
  type: "page-type/temper-world-skyshard",
  slug: "high-isle-3270-5",
  title: "High Isle skyshard 5 of achievement 3270",
  esoAchievementId: 3270,
  shardNumber: 5,
  worldZone: "temper-world-zone/high-isle",
  mapPositions: [
    { mapFolder: "systres", mapTile: "u34_systreszone_base", mapX: 0.3127, mapY: 0.34 },
  ],
} as const satisfies TemperWorldSkyshard
