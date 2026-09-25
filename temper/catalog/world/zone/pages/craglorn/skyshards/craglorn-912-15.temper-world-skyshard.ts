import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const craglorn91215 = {
  id: "01a0d5e2-03c0-7026-821a-6ab264e57be1",
  type: "page-type/temper-world-skyshard",
  slug: "craglorn-912-15",
  title: "Craglorn skyshard 15 of achievement 912",
  esoAchievementId: 912,
  shardNumber: 15,
  worldZone: "temper-world-zone/craglorn",
  mapPositions: [
    {
      mapFolder: "craglorn",
      mapTile: "craglorn_base",
      mapX: 0.4002,
      mapY: 0.3094,
      placeKinds: [2],
    },
    { mapFolder: "craglorn", mapTile: "lothna_base", mapX: 0.416, mapY: 0.425 },
  ],
} as const satisfies TemperWorldSkyshard
