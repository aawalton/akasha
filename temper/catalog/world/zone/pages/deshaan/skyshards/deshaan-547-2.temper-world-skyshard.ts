import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const deshaan5472 = {
  id: "01a0d5de-8464-7fc0-9a4b-866bf820fea2",
  type: "page-type/temper-world-skyshard",
  slug: "deshaan-547-2",
  title: "Deshaan skyshard 2 of achievement 547",
  esoAchievementId: 547,
  shardNumber: 2,
  worldZone: "temper-world-zone/deshaan",
  mapPositions: [
    { mapFolder: "deshaan", mapTile: "deshaan_base", mapX: 0.1835, mapY: 0.5147, placeKinds: [1] },
    { mapFolder: "deshaan", mapTile: "narsis_base", mapX: 0.5269, mapY: 0.3668 },
  ],
} as const satisfies TemperWorldSkyshard
