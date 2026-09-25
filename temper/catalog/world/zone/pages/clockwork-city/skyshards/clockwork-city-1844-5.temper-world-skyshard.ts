import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const clockworkCity18445 = {
  id: "01a0d5e2-66be-76c9-abc5-7fd1435edd1b",
  type: "page-type/temper-world-skyshard",
  slug: "clockwork-city-1844-5",
  title: "Clockwork City skyshard 5 of achievement 1844",
  esoAchievementId: 1844,
  shardNumber: 5,
  worldZone: "temper-world-zone/clockwork-city",
  mapPositions: [
    {
      mapFolder: "clockwork",
      mapTile: "clockwork_base",
      mapX: 0.8407,
      mapY: 0.6515,
      placeKinds: [2],
    },
    {
      mapFolder: "clockwork",
      mapTile: "hallsofregulation_2",
      mapX: 0.3698,
      mapY: 0.5642,
      placeKinds: [3],
    },
    {
      mapFolder: "clockwork",
      mapTile: "hallsofregulation_base",
      mapX: 0.3698,
      mapY: 0.5642,
      placeKinds: [3],
    },
  ],
} as const satisfies TemperWorldSkyshard
