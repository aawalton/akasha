import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const shadowfen68714 = {
  id: "01a0d5dc-5a9c-724c-96d3-3dc99203d9d6",
  type: "page-type/temper-world-skyshard",
  slug: "shadowfen-687-14",
  title: "Shadowfen skyshard 14 of achievement 687",
  esoAchievementId: 687,
  shardNumber: 14,
  worldZone: "temper-world-zone/shadowfen",
  mapPositions: [
    { mapFolder: "shadowfen", mapTile: "onkobrakwamamine_base", mapX: 0.7378, mapY: 0.521 },
    {
      mapFolder: "shadowfen",
      mapTile: "shadowfen_base",
      mapX: 0.6681,
      mapY: 0.7689,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard
