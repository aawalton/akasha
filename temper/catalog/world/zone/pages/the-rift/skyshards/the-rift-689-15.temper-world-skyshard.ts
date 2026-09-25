import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const theRift68915 = {
  id: "01a0d5e0-2f72-717e-b043-880c6e8b14a3",
  type: "page-type/temper-world-skyshard",
  slug: "the-rift-689-15",
  title: "The Rift skyshard 15 of achievement 689",
  esoAchievementId: 689,
  shardNumber: 15,
  worldZone: "temper-world-zone/the-rift",
  mapPositions: [
    { mapFolder: "therift", mapTile: "snaplegcave_base", mapX: 0.801, mapY: 0.77 },
    { mapFolder: "therift", mapTile: "therift_base", mapX: 0.317, mapY: 0.234, placeKinds: [2] },
  ],
} as const satisfies TemperWorldSkyshard
