import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const grahtwood68214 = {
  id: "01a0d5dc-7dd3-78fb-a03a-9349a038ff28",
  type: "page-type/temper-world-skyshard",
  slug: "grahtwood-682-14",
  title: "Grahtwood skyshard 14 of achievement 682",
  esoAchievementId: 682,
  shardNumber: 14,
  worldZone: "temper-world-zone/grahtwood",
  mapPositions: [
    {
      mapFolder: "grahtwood",
      mapTile: "grahtwood_base",
      mapX: 0.185,
      mapY: 0.145,
      placeKinds: [2],
    },
    { mapFolder: "grahtwood", mapTile: "wormrootdepths_base", mapX: 0.186, mapY: 0.706 },
  ],
} as const satisfies TemperWorldSkyshard
