import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const northernElsweyr24615 = {
  id: "01a0d5de-c17b-70a9-a89b-ff07177ffa2d",
  type: "page-type/temper-world-skyshard",
  slug: "northern-elsweyr-2461-5",
  title: "Northern Elsweyr skyshard 5 of achievement 2461",
  esoAchievementId: 2461,
  shardNumber: 5,
  worldZone: "temper-world-zone/northern-elsweyr",
  mapPositions: [
    { mapFolder: "elsweyr", mapTile: "elsweyr_base", mapX: 0.3911, mapY: 0.5201, placeKinds: [1] },
    { mapFolder: "elsweyr", mapTile: "stitches_base", mapX: 0.6179, mapY: 0.4916, placeKinds: [1] },
  ],
} as const satisfies TemperWorldSkyshard
