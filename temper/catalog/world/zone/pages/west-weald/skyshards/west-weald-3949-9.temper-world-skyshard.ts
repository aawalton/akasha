import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const westWeald39499 = {
  id: "01a0d5e2-94a2-7241-b779-0d57d6491f0a",
  type: "page-type/temper-world-skyshard",
  slug: "west-weald-3949-9",
  title: "West Weald skyshard 9 of achievement 3949",
  esoAchievementId: 3949,
  shardNumber: 9,
  worldZone: "temper-world-zone/west-weald",
  mapPositions: [
    { mapFolder: "westweald", mapTile: "westwealdoverland_base", mapX: 0.6438, mapY: 0.2424 },
  ],
} as const satisfies TemperWorldSkyshard
