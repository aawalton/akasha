import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const northernElsweyr24614 = {
  id: "01a0d5de-c17b-7e27-92a5-6db68bcdeea5",
  type: "page-type/temper-world-skyshard",
  slug: "northern-elsweyr-2461-4",
  title: "Northern Elsweyr skyshard 4 of achievement 2461",
  esoAchievementId: 2461,
  shardNumber: 4,
  worldZone: "temper-world-zone/northern-elsweyr",
  mapPositions: [
    { mapFolder: "elsweyr", mapTile: "elsweyr_base", mapX: 0.7325, mapY: 0.2588 },
    { mapFolder: "elsweyr", mapTile: "rimmen_base", mapX: 0.0475, mapY: 0.2967, placeKinds: [1] },
  ],
} as const satisfies TemperWorldSkyshard
