import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const southernElsweyr25623 = {
  id: "01a0d5df-6acc-78db-94d4-6a72f55a831c",
  type: "page-type/temper-world-skyshard",
  slug: "southern-elsweyr-2562-3",
  title: "Southern Elsweyr skyshard 3 of achievement 2562",
  esoAchievementId: 2562,
  shardNumber: 3,
  worldZone: "temper-world-zone/southern-elsweyr",
  mapPositions: [
    { mapFolder: "southernelsweyr", mapTile: "southernelsweyr_base", mapX: 0.345, mapY: 0.5671 },
  ],
} as const satisfies TemperWorldSkyshard
