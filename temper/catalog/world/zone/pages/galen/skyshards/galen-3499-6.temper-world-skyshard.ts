import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const galen34996 = {
  id: "01a0d5df-aba0-7712-bf49-ba7d5e96bf44",
  type: "page-type/temper-world-skyshard",
  slug: "galen-3499-6",
  title: "Galen skyshard 6 of achievement 3499",
  esoAchievementId: 3499,
  shardNumber: 6,
  worldZone: "temper-world-zone/galen",
  mapPositions: [
    {
      mapFolder: "galen",
      mapTile: "u36_embervine_base",
      mapX: 0.377,
      mapY: 0.1942,
      placeKinds: [2],
    },
    {
      mapFolder: "galen",
      mapTile: "u36_embervine_int1_base",
      mapX: 0.3909091055,
      mapY: 0.3860139846,
      placeKinds: [2],
    },
    {
      mapFolder: "galen",
      mapTile: "u36_galenisland_base",
      mapX: 0.5566987395,
      mapY: 0.4461925029,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard
