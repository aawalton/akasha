import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const southernElsweyr25621 = {
  id: "01a0d5df-6acb-7baf-8008-5e99cab5e1e5",
  type: "page-type/temper-world-skyshard",
  slug: "southern-elsweyr-2562-1",
  title: "Southern Elsweyr skyshard 1 of achievement 2562",
  esoAchievementId: 2562,
  shardNumber: 1,
  worldZone: "temper-world-zone/southern-elsweyr",
  mapPositions: [
    { mapFolder: "southernelsweyr", mapTile: "southernelsweyr_base", mapX: 0.5883, mapY: 0.2437 },
  ],
} as const satisfies TemperWorldSkyshard
