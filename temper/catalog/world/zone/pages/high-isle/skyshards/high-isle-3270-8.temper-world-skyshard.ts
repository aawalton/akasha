import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const highIsle32708 = {
  id: "01a0d5de-f9bf-7acb-ac3c-82fb3cfccc4d",
  type: "page-type/temper-world-skyshard",
  slug: "high-isle-3270-8",
  title: "High Isle skyshard 8 of achievement 3270",
  esoAchievementId: 3270,
  shardNumber: 8,
  worldZone: "temper-world-zone/high-isle",
  mapPositions: [
    { mapFolder: "systres", mapTile: "u34_systreszone_base", mapX: 0.7821, mapY: 0.4516 },
  ],
} as const satisfies TemperWorldSkyshard
