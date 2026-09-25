import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const craglorn91213 = {
  id: "01a0d5e2-03c0-769a-a2df-104d5e51fee9",
  type: "page-type/temper-world-skyshard",
  slug: "craglorn-912-13",
  title: "Craglorn skyshard 13 of achievement 912",
  esoAchievementId: 912,
  shardNumber: 13,
  worldZone: "temper-world-zone/craglorn",
  mapPositions: [
    { mapFolder: "craglorn", mapTile: "craglorn_base", mapX: 0.2825, mapY: 0.264, placeKinds: [2] },
    { mapFolder: "craglorn", mapTile: "serpentsnest_base", mapX: 0.632, mapY: 0.507 },
  ],
} as const satisfies TemperWorldSkyshard
