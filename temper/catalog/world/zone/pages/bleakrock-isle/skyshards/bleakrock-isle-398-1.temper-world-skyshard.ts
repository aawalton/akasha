import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const bleakrockIsle3981 = {
  id: "01a0d5d8-a65c-7099-b680-d3972a17de9b",
  type: "page-type/temper-world-skyshard",
  slug: "bleakrock-isle-398-1",
  title: "Bleakrock Isle skyshard 1 of achievement 398",
  esoAchievementId: 398,
  shardNumber: 1,
  worldZone: "temper-world-zone/bleakrock-isle",
  mapPositions: [
    { mapFolder: "stonefalls", mapTile: "bleakrock_base", mapX: 0.7744, mapY: 0.4388 },
  ],
} as const satisfies TemperWorldSkyshard
