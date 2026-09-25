import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const cyrodiil69441 = {
  id: "01a0d5dd-bdb4-7ccc-bb64-848d7829b8f7",
  type: "page-type/temper-world-skyshard",
  slug: "cyrodiil-694-41",
  title: "Cyrodiil skyshard 41 of achievement 694",
  esoAchievementId: 694,
  shardNumber: 41,
  worldZone: "temper-world-zone/cyrodiil",
  mapPositions: [
    { mapFolder: "cyrodiil", mapTile: "ava_whole", mapX: 0.2893, mapY: 0.4848, placeKinds: [2] },
    { mapFolder: "cyrodiil", mapTile: "breakneckcave_base", mapX: 0.488, mapY: 0.242 },
  ],
} as const satisfies TemperWorldSkyshard
