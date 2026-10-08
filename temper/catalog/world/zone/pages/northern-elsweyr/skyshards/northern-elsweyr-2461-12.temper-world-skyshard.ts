import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const northernElsweyr246112 = {
  id: "01a0d5de-c17b-7dae-96d7-4344fb3f2bdf",
  type: "page-type/temper-world-skyshard",
  slug: "northern-elsweyr-2461-12",
  title: "Northern Elsweyr skyshard 12 of achievement 2461",
  esoAchievementId: 2461,
  shardNumber: 12,
  worldZone: "temper-world-zone/northern-elsweyr",
  mapPositions: [
    { mapFolder: "elsweyr", mapTile: "elsweyr_base", mapX: 0.7043, mapY: 0.3815, placeKinds: [3] },
    {
      mapFolder: "elsweyr",
      mapTile: "rimmennecropolis_base",
      mapX: 0.8151,
      mapY: 0.4527,
      placeKinds: [3],
    },
  ],
  createdAt: "2026-09-25T00:02:20.667Z",
  updatedAt: "2026-09-25T00:02:23.000Z",
} as const satisfies TemperWorldSkyshard
