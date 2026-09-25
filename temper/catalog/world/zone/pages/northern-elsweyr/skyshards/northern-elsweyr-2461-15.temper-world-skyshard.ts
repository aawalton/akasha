import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const northernElsweyr246115 = {
  id: "01a0d5de-c17b-76e9-b573-1727329c170e",
  type: "page-type/temper-world-skyshard",
  slug: "northern-elsweyr-2461-15",
  title: "Northern Elsweyr skyshard 15 of achievement 2461",
  esoAchievementId: 2461,
  shardNumber: 15,
  worldZone: "temper-world-zone/northern-elsweyr",
  mapPositions: [
    {
      mapFolder: "elsweyr",
      mapTile: "abodeofignominy_base",
      mapX: 0.7508,
      mapY: 0.7881,
      placeKinds: [2],
    },
    { mapFolder: "elsweyr", mapTile: "elsweyr_base", mapX: 0.4048, mapY: 0.2249, placeKinds: [2] },
  ],
} as const satisfies TemperWorldSkyshard
