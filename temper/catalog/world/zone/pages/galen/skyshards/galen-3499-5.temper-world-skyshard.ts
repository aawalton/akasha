import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const galen34995 = {
  id: "01a0d5df-aba0-7c10-ae1d-9750c5b38add",
  type: "page-type/temper-world-skyshard",
  slug: "galen-3499-5",
  title: "Galen skyshard 5 of achievement 3499",
  esoAchievementId: 3499,
  shardNumber: 5,
  worldZone: "temper-world-zone/galen",
  mapPositions: [
    {
      mapFolder: "galen",
      mapTile: "u36_galenisland_base",
      mapX: 0.2152689993,
      mapY: 0.4701301157,
      placeKinds: [2],
    },
    { mapFolder: "galen", mapTile: "u36_lkh_base", mapX: 0.4575, mapY: 0.7518, placeKinds: [2] },
  ],
} as const satisfies TemperWorldSkyshard
