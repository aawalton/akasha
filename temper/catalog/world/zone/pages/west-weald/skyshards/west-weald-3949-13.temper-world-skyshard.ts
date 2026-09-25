import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const westWeald394913 = {
  id: "01a0d5e2-94a1-7c11-8190-bed7af9c786f",
  type: "page-type/temper-world-skyshard",
  slug: "west-weald-3949-13",
  title: "West Weald skyshard 13 of achievement 3949",
  esoAchievementId: 3949,
  shardNumber: 13,
  worldZone: "temper-world-zone/west-weald",
  mapPositions: [
    {
      mapFolder: "westweald",
      mapTile: "u42_windcave_base",
      mapX: 0.4547,
      mapY: 0.2831,
      placeKinds: [2],
    },
    {
      mapFolder: "westweald",
      mapTile: "westwealdoverland_base",
      mapX: 0.68,
      mapY: 0.3774,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard
