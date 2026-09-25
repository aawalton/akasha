import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const eastmarch68810 = {
  id: "01a0d5dd-a09c-781c-8f3b-adb7a5faac97",
  type: "page-type/temper-world-skyshard",
  slug: "eastmarch-688-10",
  title: "Eastmarch skyshard 10 of achievement 688",
  esoAchievementId: 688,
  shardNumber: 10,
  worldZone: "temper-world-zone/eastmarch",
  mapPositions: [
    {
      mapFolder: "eastmarch",
      mapTile: "eastmarch_base",
      mapX: 0.725,
      mapY: 0.623,
      placeKinds: [2],
    },
    { mapFolder: "eastmarch", mapTile: "thebastardstomb_base", mapX: 0.543, mapY: 0.133 },
  ],
} as const satisfies TemperWorldSkyshard
