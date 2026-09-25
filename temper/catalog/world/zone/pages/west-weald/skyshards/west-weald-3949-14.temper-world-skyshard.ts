import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const westWeald394914 = {
  id: "01a0d5e2-94a1-7a4a-8ccd-d078e703cf0d",
  type: "page-type/temper-world-skyshard",
  slug: "west-weald-3949-14",
  title: "West Weald skyshard 14 of achievement 3949",
  esoAchievementId: 3949,
  shardNumber: 14,
  worldZone: "temper-world-zone/west-weald",
  mapPositions: [
    {
      mapFolder: "westweald",
      mapTile: "u42_fyrelightcave_base",
      mapX: 0.3335,
      mapY: 0.4267,
      placeKinds: [2],
    },
    {
      mapFolder: "westweald",
      mapTile: "westwealdoverland_base",
      mapX: 0.5343,
      mapY: 0.7285,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard
