import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const northernElsweyr246113 = {
  id: "01a0d5de-c17b-7a8b-ab75-e26df40982a1",
  type: "page-type/temper-world-skyshard",
  slug: "northern-elsweyr-2461-13",
  title: "Northern Elsweyr skyshard 13 of achievement 2461",
  esoAchievementId: 2461,
  shardNumber: 13,
  worldZone: "temper-world-zone/northern-elsweyr",
  mapPositions: [
    {
      mapFolder: "elsweyr",
      mapTile: "desertwind_base",
      mapX: 0.3785,
      mapY: 0.8465,
      placeKinds: [2],
    },
    { mapFolder: "elsweyr", mapTile: "elsweyr_base", mapX: 0.3968, mapY: 0.4311, placeKinds: [2] },
  ],
} as const satisfies TemperWorldSkyshard
