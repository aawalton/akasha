import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const northernElsweyr246116 = {
  id: "01a0d5de-c17b-770f-b321-e6c95b577423",
  type: "page-type/temper-world-skyshard",
  slug: "northern-elsweyr-2461-16",
  title: "Northern Elsweyr skyshard 16 of achievement 2461",
  esoAchievementId: 2461,
  shardNumber: 16,
  worldZone: "temper-world-zone/northern-elsweyr",
  mapPositions: [
    { mapFolder: "elsweyr", mapTile: "elsweyr_base", mapX: 0.1526, mapY: 0.609, placeKinds: [2] },
    { mapFolder: "elsweyr", mapTile: "thescab_base", mapX: 0.5616, mapY: 0.4959, placeKinds: [2] },
  ],
} as const satisfies TemperWorldSkyshard
