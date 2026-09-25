import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const craglorn7272 = {
  id: "01a0d5e2-03c0-7603-aab6-70b282e9f7b0",
  type: "page-type/temper-world-skyshard",
  slug: "craglorn-727-2",
  title: "Craglorn skyshard 2 of achievement 727",
  esoAchievementId: 727,
  shardNumber: 2,
  worldZone: "temper-world-zone/craglorn",
  mapPositions: [
    {
      mapFolder: "craglorn",
      mapTile: "craglorn_base",
      mapX: 0.6853,
      mapY: 0.5995,
      placeKinds: [5],
    },
    { mapFolder: "craglorn", mapTile: "rkundzelft_base", mapX: 0.715, mapY: 0.382 },
  ],
} as const satisfies TemperWorldSkyshard
