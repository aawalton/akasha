import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const westWeald39496 = {
  id: "01a0d5e2-94a2-7e3c-b93f-b2ce776a6a6f",
  type: "page-type/temper-world-skyshard",
  slug: "west-weald-3949-6",
  title: "West Weald skyshard 6 of achievement 3949",
  esoAchievementId: 3949,
  shardNumber: 6,
  worldZone: "temper-world-zone/west-weald",
  mapPositions: [
    {
      mapFolder: "westweald",
      mapTile: "u42_ontus_city_base",
      mapX: 0.1598,
      mapY: 0.701,
      placeKinds: [1],
    },
    {
      mapFolder: "westweald",
      mapTile: "westwealdoverland_base",
      mapX: 0.5108,
      mapY: 0.4436,
      placeKinds: [1],
    },
  ],
} as const satisfies TemperWorldSkyshard
