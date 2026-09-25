import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const highIsle327015 = {
  id: "01a0d5de-f9bf-7845-9522-92a612a2989b",
  type: "page-type/temper-world-skyshard",
  slug: "high-isle-3270-15",
  title: "High Isle skyshard 15 of achievement 3270",
  esoAchievementId: 3270,
  shardNumber: 15,
  worldZone: "temper-world-zone/high-isle",
  mapPositions: [
    {
      mapFolder: "systres",
      mapTile: "u34_firepotcave_base",
      mapX: 0.3721571266,
      mapY: 0.5969663929,
      placeKinds: [2],
    },
    {
      mapFolder: "systres",
      mapTile: "u34_systreszone_base",
      mapX: 0.2757271826,
      mapY: 0.7063370943,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard
