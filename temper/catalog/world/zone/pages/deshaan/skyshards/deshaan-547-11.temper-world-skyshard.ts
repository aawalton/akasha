import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const deshaan54711 = {
  id: "01a0d5de-8464-795d-84e8-8c7a1826705c",
  type: "page-type/temper-world-skyshard",
  slug: "deshaan-547-11",
  title: "Deshaan skyshard 11 of achievement 547",
  esoAchievementId: 547,
  shardNumber: 11,
  worldZone: "temper-world-zone/deshaan",
  mapPositions: [
    { mapFolder: "deshaan", mapTile: "deshaan_base", mapX: 0.9128, mapY: 0.4383, placeKinds: [2] },
    { mapFolder: "deshaan", mapTile: "desolatecave_base", mapX: 0.5007, mapY: 0.6418 },
  ],
} as const satisfies TemperWorldSkyshard
