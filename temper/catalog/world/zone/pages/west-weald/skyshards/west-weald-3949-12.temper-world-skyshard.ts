import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const westWeald394912 = {
  id: "01a0d5e2-94a1-785b-9bd1-07d48f4e136f",
  type: "page-type/temper-world-skyshard",
  slug: "west-weald-3949-12",
  title: "West Weald skyshard 12 of achievement 3949",
  esoAchievementId: 3949,
  shardNumber: 12,
  worldZone: "temper-world-zone/west-weald",
  mapPositions: [
    {
      mapFolder: "westweald",
      mapTile: "u42_leftwheal_ext2_base",
      mapX: 0.3846,
      mapY: 0.2871,
      placeKinds: [3],
    },
    {
      mapFolder: "westweald",
      mapTile: "westwealdoverland_base",
      mapX: 0.3396,
      mapY: 0.4878,
      placeKinds: [3],
    },
  ],
} as const satisfies TemperWorldSkyshard
