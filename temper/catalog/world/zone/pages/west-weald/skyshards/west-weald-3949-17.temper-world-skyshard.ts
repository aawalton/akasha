import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const westWeald394917 = {
  id: "01a0d5e2-94a1-7b03-964a-4ac621b3912e",
  type: "page-type/temper-world-skyshard",
  slug: "west-weald-3949-17",
  title: "West Weald skyshard 17 of achievement 3949",
  esoAchievementId: 3949,
  shardNumber: 17,
  worldZone: "temper-world-zone/west-weald",
  mapPositions: [
    {
      mapFolder: "westweald",
      mapTile: "u42_base_haldain",
      mapX: 0.511,
      mapY: 0.7589,
      placeKinds: [2],
    },
    {
      mapFolder: "westweald",
      mapTile: "westwealdoverland_base",
      mapX: 0.7183,
      mapY: 0.734,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard
