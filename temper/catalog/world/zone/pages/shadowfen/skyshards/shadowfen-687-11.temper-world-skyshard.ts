import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const shadowfen68711 = {
  id: "01a0d5dc-5a9c-7019-a408-874bd4c1f367",
  type: "page-type/temper-world-skyshard",
  slug: "shadowfen-687-11",
  title: "Shadowfen skyshard 11 of achievement 687",
  esoAchievementId: 687,
  shardNumber: 11,
  worldZone: "temper-world-zone/shadowfen",
  mapPositions: [
    { mapFolder: "shadowfen", mapTile: "brokentuskcave_base", mapX: 0.3523, mapY: 0.3464 },
    {
      mapFolder: "shadowfen",
      mapTile: "shadowfen_base",
      mapX: 0.8263,
      mapY: 0.3771,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard
