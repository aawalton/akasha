import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const shadowfen68716 = {
  id: "01a0d5dc-5a9c-7cc3-848f-259b26a56e93",
  type: "page-type/temper-world-skyshard",
  slug: "shadowfen-687-16",
  title: "Shadowfen skyshard 16 of achievement 687",
  esoAchievementId: 687,
  shardNumber: 16,
  worldZone: "temper-world-zone/shadowfen",
  mapPositions: [
    { mapFolder: "shadowfen", mapTile: "sanguinesdemesne_base", mapX: 0.6437, mapY: 0.6056 },
    {
      mapFolder: "shadowfen",
      mapTile: "shadowfen_base",
      mapX: 0.6513,
      mapY: 0.2719,
      placeKinds: [3],
    },
  ],
} as const satisfies TemperWorldSkyshard
