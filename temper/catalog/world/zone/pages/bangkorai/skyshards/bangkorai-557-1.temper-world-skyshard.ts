import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const bangkorai5571 = {
  id: "01a0d5db-49a1-702c-8830-821bbe451d2b",
  type: "page-type/temper-world-skyshard",
  slug: "bangkorai-557-1",
  title: "Bangkorai skyshard 1 of achievement 557",
  esoAchievementId: 557,
  shardNumber: 1,
  worldZone: "temper-world-zone/bangkorai",
  mapPositions: [
    { mapFolder: "bangkorai", mapTile: "bangkorai_base", mapX: 0.387, mapY: 0.39, placeKinds: [1] },
    { mapFolder: "bangkorai", mapTile: "evermore_base", mapX: 0.355, mapY: 0.68 },
  ],
} as const satisfies TemperWorldSkyshard
