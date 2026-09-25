import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const summerset18451 = {
  id: "01a0d5e5-0ffe-7bbf-86ce-ca1408a95d63",
  type: "page-type/temper-world-skyshard",
  slug: "summerset-1845-1",
  title: "Summerset skyshard 1 of achievement 1845",
  esoAchievementId: 1845,
  shardNumber: 1,
  worldZone: "temper-world-zone/summerset",
  mapPositions: [
    { mapFolder: "summerset", mapTile: "alinor_base", mapX: 0.4176, mapY: 0.1979 },
    { mapFolder: "summerset", mapTile: "summerset_base", mapX: 0.2858, mapY: 0.5687 },
  ],
} as const satisfies TemperWorldSkyshard
