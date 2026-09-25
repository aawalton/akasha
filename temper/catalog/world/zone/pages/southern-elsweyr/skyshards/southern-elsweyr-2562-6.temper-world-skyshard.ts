import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const southernElsweyr25626 = {
  id: "01a0d5df-6acc-7372-94d6-575018e9ce00",
  type: "page-type/temper-world-skyshard",
  slug: "southern-elsweyr-2562-6",
  title: "Southern Elsweyr skyshard 6 of achievement 2562",
  esoAchievementId: 2562,
  shardNumber: 6,
  worldZone: "temper-world-zone/southern-elsweyr",
  mapPositions: [
    {
      mapFolder: "southernelsweyr",
      mapTile: "houseofembersinside_base",
      mapX: 0.401,
      mapY: 0.3841,
      placeKinds: [2],
    },
    {
      mapFolder: "southernelsweyr",
      mapTile: "southernelsweyr_base",
      mapX: 0.5066,
      mapY: 0.2937,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard
