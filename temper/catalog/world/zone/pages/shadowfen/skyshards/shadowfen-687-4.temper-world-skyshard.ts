import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const shadowfen6874 = {
  id: "01a0d5dc-5a9c-7724-a2a6-955f6ce41c2d",
  type: "page-type/temper-world-skyshard",
  slug: "shadowfen-687-4",
  title: "Shadowfen skyshard 4 of achievement 687",
  esoAchievementId: 687,
  shardNumber: 4,
  worldZone: "temper-world-zone/shadowfen",
  mapPositions: [
    { mapFolder: "shadowfen", mapTile: "altencorimont_base", mapX: 0.3629, mapY: 0.5262 },
    {
      mapFolder: "shadowfen",
      mapTile: "shadowfen_base",
      mapX: 0.6575,
      mapY: 0.5916,
      placeKinds: [1],
    },
  ],
} as const satisfies TemperWorldSkyshard
