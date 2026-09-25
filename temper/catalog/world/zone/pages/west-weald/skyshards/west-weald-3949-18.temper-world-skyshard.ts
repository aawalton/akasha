import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const westWeald394918 = {
  id: "01a0d5e2-94a2-7c3f-a21c-8a54f31e7175",
  type: "page-type/temper-world-skyshard",
  slug: "west-weald-3949-18",
  title: "West Weald skyshard 18 of achievement 3949",
  esoAchievementId: 3949,
  shardNumber: 18,
  worldZone: "temper-world-zone/west-weald",
  mapPositions: [
    {
      mapFolder: "westweald",
      mapTile: "ui_maps_u42_varenswall_ext",
      mapX: 0.5089,
      mapY: 0.4037,
      placeKinds: [2],
    },
    {
      mapFolder: "westweald",
      mapTile: "westwealdoverland_base",
      mapX: 0.1407,
      mapY: 0.6124,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard
