import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const highIsle32701 = {
  id: "01a0d5de-f9be-74c4-ab88-adb9d036a24c",
  type: "page-type/temper-world-skyshard",
  slug: "high-isle-3270-1",
  title: "High Isle skyshard 1 of achievement 3270",
  esoAchievementId: 3270,
  shardNumber: 1,
  worldZone: "temper-world-zone/high-isle",
  mapPositions: [
    { mapFolder: "systres", mapTile: "u34_systreszone_base", mapX: 0.291, mapY: 0.7498 },
  ],
} as const satisfies TemperWorldSkyshard
