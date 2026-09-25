import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const westWeald394911 = {
  id: "01a0d5e2-94a1-71f8-884e-af424dc52fed",
  type: "page-type/temper-world-skyshard",
  slug: "west-weald-3949-11",
  title: "West Weald skyshard 11 of achievement 3949",
  esoAchievementId: 3949,
  shardNumber: 11,
  worldZone: "temper-world-zone/west-weald",
  mapPositions: [
    {
      mapFolder: "westweald",
      mapTile: "u42_silorn_base",
      mapX: 0.5594,
      mapY: 0.314,
      placeKinds: [3],
    },
    {
      mapFolder: "westweald",
      mapTile: "westwealdoverland_base",
      mapX: 0.8684,
      mapY: 0.688,
      placeKinds: [3],
    },
  ],
} as const satisfies TemperWorldSkyshard
