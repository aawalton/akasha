import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const clockworkCity18443 = {
  id: "01a0d5e2-66be-752d-a9f4-56ed74549082",
  type: "page-type/temper-world-skyshard",
  slug: "clockwork-city-1844-3",
  title: "Clockwork City skyshard 3 of achievement 1844",
  esoAchievementId: 1844,
  shardNumber: 3,
  worldZone: "temper-world-zone/clockwork-city",
  mapPositions: [
    {
      mapFolder: "clockwork",
      mapTile: "brassfortress_base",
      mapX: 0.4576,
      mapY: 0.5555,
      placeKinds: [4],
    },
    {
      mapFolder: "clockwork",
      mapTile: "ccunderground02_base",
      mapX: 0.85,
      mapY: 0.72,
      placeKinds: [4],
    },
    {
      mapFolder: "clockwork",
      mapTile: "ccunderground_base",
      mapX: 0.85,
      mapY: 0.72,
      placeKinds: [4],
    },
    {
      mapFolder: "clockwork",
      mapTile: "clockwork_base",
      mapX: 0.411,
      mapY: 0.4609,
      placeKinds: [4],
    },
  ],
} as const satisfies TemperWorldSkyshard
