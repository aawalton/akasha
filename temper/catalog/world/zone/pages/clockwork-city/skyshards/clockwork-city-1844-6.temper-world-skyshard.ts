import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const clockworkCity18446 = {
  id: "01a0d5e2-66be-794a-9c95-2fd516b7e2d4",
  type: "page-type/temper-world-skyshard",
  slug: "clockwork-city-1844-6",
  title: "Clockwork City skyshard 6 of achievement 1844",
  esoAchievementId: 1844,
  shardNumber: 6,
  worldZone: "temper-world-zone/clockwork-city",
  mapPositions: [
    {
      mapFolder: "clockwork",
      mapTile: "clockwork_base",
      mapX: 0.2682,
      mapY: 0.5764,
      placeKinds: [2],
    },
    {
      mapFolder: "clockwork",
      mapTile: "shadowcleft_base",
      mapX: 0.8365,
      mapY: 0.5701,
      placeKinds: [3],
    },
  ],
} as const satisfies TemperWorldSkyshard
