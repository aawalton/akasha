import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const craglorn72711 = {
  id: "01a0d5e2-03c0-7d1f-869f-44e2cb59aa5d",
  type: "page-type/temper-world-skyshard",
  slug: "craglorn-727-11",
  title: "Craglorn skyshard 11 of achievement 727",
  esoAchievementId: 727,
  shardNumber: 11,
  worldZone: "temper-world-zone/craglorn",
  mapPositions: [
    {
      mapFolder: "craglorn",
      mapTile: "craglorn_base",
      mapX: 0.3219,
      mapY: 0.6543,
      placeKinds: [2],
    },
    { mapFolder: "craglorn", mapTile: "cryptoftarishzizone_base", mapX: 0.83, mapY: 0.446 },
  ],
} as const satisfies TemperWorldSkyshard
