import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const bleakrockIsle3982 = {
  id: "01a0d5d8-a65d-790e-b73d-b9dc7753159a",
  type: "page-type/temper-world-skyshard",
  slug: "bleakrock-isle-398-2",
  title: "Bleakrock Isle skyshard 2 of achievement 398",
  esoAchievementId: 398,
  shardNumber: 2,
  worldZone: "temper-world-zone/bleakrock-isle",
  mapPositions: [
    { mapFolder: "stonefalls", mapTile: "bleakrock_base", mapX: 0.4985, mapY: 0.2252 },
  ],
} as const satisfies TemperWorldSkyshard
