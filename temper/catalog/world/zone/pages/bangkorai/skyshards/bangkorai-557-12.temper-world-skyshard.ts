import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const bangkorai55712 = {
  id: "01a0d5db-49a3-7f6f-bac9-fd9c472306b9",
  type: "page-type/temper-world-skyshard",
  slug: "bangkorai-557-12",
  title: "Bangkorai skyshard 12 of achievement 557",
  esoAchievementId: 557,
  shardNumber: 12,
  worldZone: "temper-world-zone/bangkorai",
  mapPositions: [
    { mapFolder: "bangkorai", mapTile: "bangkorai_base", mapX: 0.332, mapY: 0.27, placeKinds: [2] },
    { mapFolder: "bangkorai", mapTile: "murciensclaim_base", mapX: 0.188, mapY: 0.237 },
  ],
} as const satisfies TemperWorldSkyshard
