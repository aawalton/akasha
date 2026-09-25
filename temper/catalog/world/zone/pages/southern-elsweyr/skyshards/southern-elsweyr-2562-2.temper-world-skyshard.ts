import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const southernElsweyr25622 = {
  id: "01a0d5df-6acc-7a55-8849-2c0f416da8fe",
  type: "page-type/temper-world-skyshard",
  slug: "southern-elsweyr-2562-2",
  title: "Southern Elsweyr skyshard 2 of achievement 2562",
  esoAchievementId: 2562,
  shardNumber: 2,
  worldZone: "temper-world-zone/southern-elsweyr",
  mapPositions: [
    {
      mapFolder: "southernelsweyr",
      mapTile: "senchal_base",
      mapX: 0.2467,
      mapY: 0.6866,
      placeKinds: [1],
    },
    {
      mapFolder: "southernelsweyr",
      mapTile: "southernelsweyr_base",
      mapX: 0.4481,
      mapY: 0.5515,
      placeKinds: [1],
    },
  ],
} as const satisfies TemperWorldSkyshard
