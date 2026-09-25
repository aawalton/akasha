import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const westWeald394916 = {
  id: "01a0d5e2-94a1-7f8a-bde1-b2fd7dfcef9c",
  type: "page-type/temper-world-skyshard",
  slug: "west-weald-3949-16",
  title: "West Weald skyshard 16 of achievement 3949",
  esoAchievementId: 3949,
  shardNumber: 16,
  worldZone: "temper-world-zone/west-weald",
  mapPositions: [
    {
      mapFolder: "westweald",
      mapTile: "u42_base_towerbelli",
      mapX: 0.4985819756,
      mapY: 0.6549369692,
      placeKinds: [2],
    },
    {
      mapFolder: "westweald",
      mapTile: "westwealdoverland_base",
      mapX: 0.768,
      mapY: 0.2075,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard
