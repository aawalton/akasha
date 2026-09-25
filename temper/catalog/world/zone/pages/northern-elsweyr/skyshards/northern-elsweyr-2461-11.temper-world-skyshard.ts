import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const northernElsweyr246111 = {
  id: "01a0d5de-c17b-77ca-8d4d-a8fc98ee4ef2",
  type: "page-type/temper-world-skyshard",
  slug: "northern-elsweyr-2461-11",
  title: "Northern Elsweyr skyshard 11 of achievement 2461",
  esoAchievementId: 2461,
  shardNumber: 11,
  worldZone: "temper-world-zone/northern-elsweyr",
  mapPositions: [
    { mapFolder: "elsweyr", mapTile: "elsweyr_base", mapX: 0.48, mapY: 0.4876, placeKinds: [3] },
    { mapFolder: "elsweyr", mapTile: "orcrest_base", mapX: 0.3092, mapY: 0.6927, placeKinds: [3] },
    {
      mapFolder: "elsweyr",
      mapTile: "orcrestsewer_base",
      mapX: 0.5784,
      mapY: 0.5863,
      placeKinds: [3],
    },
  ],
} as const satisfies TemperWorldSkyshard
