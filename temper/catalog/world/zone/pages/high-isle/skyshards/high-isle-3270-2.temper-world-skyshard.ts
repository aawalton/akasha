import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const highIsle32702 = {
  id: "01a0d5de-f9bf-75dc-8567-eed08e172942",
  type: "page-type/temper-world-skyshard",
  slug: "high-isle-3270-2",
  title: "High Isle skyshard 2 of achievement 3270",
  esoAchievementId: 3270,
  shardNumber: 2,
  worldZone: "temper-world-zone/high-isle",
  mapPositions: [
    { mapFolder: "systres", mapTile: "u34_systreszone_base", mapX: 0.515, mapY: 0.7823 },
  ],
} as const satisfies TemperWorldSkyshard
