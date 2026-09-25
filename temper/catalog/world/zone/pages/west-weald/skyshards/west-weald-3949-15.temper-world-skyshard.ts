import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const westWeald394915 = {
  id: "01a0d5e2-94a1-76ea-9202-f26ff676ab8b",
  type: "page-type/temper-world-skyshard",
  slug: "west-weald-3949-15",
  title: "West Weald skyshard 15 of achievement 3949",
  esoAchievementId: 3949,
  shardNumber: 15,
  worldZone: "temper-world-zone/west-weald",
  mapPositions: [
    {
      mapFolder: "westweald",
      mapTile: "u42_base_nonungalo",
      mapX: 0.4379,
      mapY: 0.3005,
      placeKinds: [2],
    },
    {
      mapFolder: "westweald",
      mapTile: "westwealdoverland_base",
      mapX: 0.5116,
      mapY: 0.5197,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard
