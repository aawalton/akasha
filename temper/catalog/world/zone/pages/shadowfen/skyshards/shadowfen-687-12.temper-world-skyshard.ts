import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const shadowfen68712 = {
  id: "01a0d5dc-5a9c-792b-bf4c-722140b10503",
  type: "page-type/temper-world-skyshard",
  slug: "shadowfen-687-12",
  title: "Shadowfen skyshard 12 of achievement 687",
  esoAchievementId: 687,
  shardNumber: 12,
  worldZone: "temper-world-zone/shadowfen",
  mapPositions: [
    { mapFolder: "shadowfen", mapTile: "chidmoskaruins_base", mapX: 0.8161, mapY: 0.7606 },
    {
      mapFolder: "shadowfen",
      mapTile: "shadowfen_base",
      mapX: 0.254,
      mapY: 0.7958,
      placeKinds: [2],
    },
  ],
  createdAt: "2026-09-24T23:59:43.260Z",
  updatedAt: "2026-09-24T23:59:47.000Z",
} as const satisfies TemperWorldSkyshard
