import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const balFoyen4051 = {
  id: "01a0d5d9-15eb-7a46-8b50-b3890d8e6b8f",
  type: "page-type/temper-world-skyshard",
  slug: "bal-foyen-405-1",
  title: "Bal Foyen skyshard 1 of achievement 405",
  esoAchievementId: 405,
  shardNumber: 1,
  worldZone: "temper-world-zone/bal-foyen",
  mapPositions: [
    {
      mapFolder: "stonefalls",
      mapTile: "balfoyen_base",
      mapX: 0.5505,
      mapY: 0.5609,
      placeKinds: [1],
    },
    { mapFolder: "stonefalls", mapTile: "dhalmora_base", mapX: 0.3312, mapY: 0.4539 },
  ],
} as const satisfies TemperWorldSkyshard
