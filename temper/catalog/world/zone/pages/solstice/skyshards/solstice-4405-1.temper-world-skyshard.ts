import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const solstice44051 = {
  id: "01a0d5e5-c3cd-7a21-b632-9f8b0489e2c3",
  type: "page-type/temper-world-skyshard",
  slug: "solstice-4405-1",
  title: "Solstice skyshard 1 of achievement 4405",
  esoAchievementId: 4405,
  shardNumber: 1,
  worldZone: "temper-world-zone/solstice",
  mapPositions: [
    {
      mapFolder: "solstice",
      mapTile: "u46_base_cotp",
      mapX: 0.4012,
      mapY: 0.5243,
      placeKinds: [3],
    },
    {
      mapFolder: "solstice",
      mapTile: "u48_overland_base",
      mapX: 0.5109,
      mapY: 0.432,
      placeKinds: [3],
    },
  ],
} as const satisfies TemperWorldSkyshard
