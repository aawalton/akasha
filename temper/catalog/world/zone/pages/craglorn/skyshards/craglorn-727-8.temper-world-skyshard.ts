import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const craglorn7278 = {
  id: "01a0d5e2-03c0-7732-86ab-d95786b68ab7",
  type: "page-type/temper-world-skyshard",
  slug: "craglorn-727-8",
  title: "Craglorn skyshard 8 of achievement 727",
  esoAchievementId: 727,
  shardNumber: 8,
  worldZone: "temper-world-zone/craglorn",
  mapPositions: [
    { mapFolder: "craglorn", mapTile: "craglorn_base", mapX: 0.2149, mapY: 0.575, placeKinds: [5] },
    { mapFolder: "craglorn", mapTile: "mtharnaz_base", mapX: 0.884, mapY: 0.625 },
  ],
} as const satisfies TemperWorldSkyshard
