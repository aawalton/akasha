import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const craglorn7273 = {
  id: "01a0d5e2-03c0-773c-9766-88db820f1f46",
  type: "page-type/temper-world-skyshard",
  slug: "craglorn-727-3",
  title: "Craglorn skyshard 3 of achievement 727",
  esoAchievementId: 727,
  shardNumber: 3,
  worldZone: "temper-world-zone/craglorn",
  mapPositions: [
    {
      mapFolder: "craglorn",
      mapTile: "craglorn_base",
      mapX: 0.2847,
      mapY: 0.4599,
      placeKinds: [5],
    },
    { mapFolder: "craglorn", mapTile: "kardala_base", mapX: 0.612, mapY: 0.455 },
  ],
} as const satisfies TemperWorldSkyshard
