import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const shadowfen68710 = {
  id: "01a0d5dc-5a9b-7292-899b-1f3577b5eee6",
  type: "page-type/temper-world-skyshard",
  slug: "shadowfen-687-10",
  title: "Shadowfen skyshard 10 of achievement 687",
  esoAchievementId: 687,
  shardNumber: 10,
  worldZone: "temper-world-zone/shadowfen",
  mapPositions: [
    { mapFolder: "shadowfen", mapTile: "atanazruins_base", mapX: 0.3601, mapY: 0.7318 },
    {
      mapFolder: "shadowfen",
      mapTile: "shadowfen_base",
      mapX: 0.8497,
      mapY: 0.5956,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard
