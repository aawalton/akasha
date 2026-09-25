import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const craglorn7271 = {
  id: "01a0d5e2-03bf-75f4-8483-2ba17901546c",
  type: "page-type/temper-world-skyshard",
  slug: "craglorn-727-1",
  title: "Craglorn skyshard 1 of achievement 727",
  esoAchievementId: 727,
  shardNumber: 1,
  worldZone: "temper-world-zone/craglorn",
  mapPositions: [
    { mapFolder: "craglorn", mapTile: "craglorn_base", mapX: 0.7478, mapY: 0.725, placeKinds: [2] },
    { mapFolder: "craglorn", mapTile: "molavar_base", mapX: 0.747, mapY: 0.352 },
  ],
} as const satisfies TemperWorldSkyshard
