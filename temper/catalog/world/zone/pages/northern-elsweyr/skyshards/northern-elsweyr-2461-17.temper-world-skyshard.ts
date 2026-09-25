import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const northernElsweyr246117 = {
  id: "01a0d5de-c17b-7d31-a206-1a7ff0d1f912",
  type: "page-type/temper-world-skyshard",
  slug: "northern-elsweyr-2461-17",
  title: "Northern Elsweyr skyshard 17 of achievement 2461",
  esoAchievementId: 2461,
  shardNumber: 17,
  worldZone: "temper-world-zone/northern-elsweyr",
  mapPositions: [
    { mapFolder: "elsweyr", mapTile: "elsweyr_base", mapX: 0.627, mapY: 0.5862, placeKinds: [2] },
    {
      mapFolder: "elsweyr",
      mapTile: "thetangle_base",
      mapX: 0.1023,
      mapY: 0.6137,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard
