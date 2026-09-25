import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const southernElsweyr25624 = {
  id: "01a0d5df-6acc-79b8-8e9b-913a53ea0b8d",
  type: "page-type/temper-world-skyshard",
  slug: "southern-elsweyr-2562-4",
  title: "Southern Elsweyr skyshard 4 of achievement 2562",
  esoAchievementId: 2562,
  shardNumber: 4,
  worldZone: "temper-world-zone/southern-elsweyr",
  mapPositions: [
    { mapFolder: "southernelsweyr", mapTile: "southernelsweyr_base", mapX: 0.2575, mapY: 0.3207 },
  ],
} as const satisfies TemperWorldSkyshard
