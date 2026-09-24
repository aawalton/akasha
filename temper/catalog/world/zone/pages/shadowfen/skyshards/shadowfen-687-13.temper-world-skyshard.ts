import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const shadowfen68713 = {
  id: "01a0d5dc-5a9c-79b0-a284-a9629d4b501d",
  type: "page-type/temper-world-skyshard",
  slug: "shadowfen-687-13",
  title: "Shadowfen skyshard 13 of achievement 687",
  esoAchievementId: 687,
  shardNumber: 13,
  worldZone: "temper-world-zone/shadowfen",
  mapPositions: [
    { mapFolder: "shadowfen", mapTile: "gandranen_base", mapX: 0.7728, mapY: 0.3154 },
    {
      mapFolder: "shadowfen",
      mapTile: "shadowfen_base",
      mapX: 0.4482,
      mapY: 0.6214,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard
