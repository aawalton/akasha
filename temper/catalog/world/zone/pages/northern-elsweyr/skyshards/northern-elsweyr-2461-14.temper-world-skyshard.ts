import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const northernElsweyr246114 = {
  id: "01a0d5de-c17b-7b1b-8607-3273058e5fda",
  type: "page-type/temper-world-skyshard",
  slug: "northern-elsweyr-2461-14",
  title: "Northern Elsweyr skyshard 14 of achievement 2461",
  esoAchievementId: 2461,
  shardNumber: 14,
  worldZone: "temper-world-zone/northern-elsweyr",
  mapPositions: [
    { mapFolder: "elsweyr", mapTile: "elsweyr_base", mapX: 0.2664, mapY: 0.4252, placeKinds: [2] },
    {
      mapFolder: "elsweyr",
      mapTile: "predatorrise_base",
      mapX: 0.631,
      mapY: 0.2734,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard
