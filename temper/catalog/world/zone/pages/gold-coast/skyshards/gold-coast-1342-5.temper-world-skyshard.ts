import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const goldCoast13425 = {
  id: "01a0d5df-9143-7522-b976-5de76c0b9bc7",
  type: "page-type/temper-world-skyshard",
  slug: "gold-coast-1342-5",
  title: "Gold Coast skyshard 5 of achievement 1342",
  esoAchievementId: 1342,
  shardNumber: 5,
  worldZone: "temper-world-zone/gold-coast",
  mapPositions: [
    {
      mapFolder: "darkbrotherhood",
      mapTile: "goldcoast_base",
      mapX: 0.3915,
      mapY: 0.4522,
      placeKinds: [2],
    },
    {
      mapFolder: "darkbrotherhood",
      mapTile: "hrotacave_base",
      mapX: 0.6786,
      mapY: 0.4567,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard
