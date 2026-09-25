import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const northernElsweyr246118 = {
  id: "01a0d5de-c17b-7bab-9b64-e45893eac52e",
  type: "page-type/temper-world-skyshard",
  slug: "northern-elsweyr-2461-18",
  title: "Northern Elsweyr skyshard 18 of achievement 2461",
  esoAchievementId: 2461,
  shardNumber: 18,
  worldZone: "temper-world-zone/northern-elsweyr",
  mapPositions: [
    { mapFolder: "elsweyr", mapTile: "elsweyr_base", mapX: 0.6153, mapY: 0.2346, placeKinds: [2] },
    {
      mapFolder: "elsweyr",
      mapTile: "tombofserpents_base",
      mapX: 0.1207,
      mapY: 0.3599,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard
