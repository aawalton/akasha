import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const craglorn7275 = {
  id: "01a0d5e2-03c0-793d-a535-5e6c62bd6699",
  type: "page-type/temper-world-skyshard",
  slug: "craglorn-727-5",
  title: "Craglorn skyshard 5 of achievement 727",
  esoAchievementId: 727,
  shardNumber: 5,
  worldZone: "temper-world-zone/craglorn",
  mapPositions: [
    {
      mapFolder: "craglorn",
      mapTile: "craglorn_base",
      mapX: 0.6674,
      mapY: 0.6733,
      placeKinds: [2],
    },
    { mapFolder: "craglorn", mapTile: "haddock_base", mapX: 0.656, mapY: 0.233 },
  ],
} as const satisfies TemperWorldSkyshard
