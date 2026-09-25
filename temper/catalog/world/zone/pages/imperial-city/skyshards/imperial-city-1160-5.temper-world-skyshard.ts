import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const imperialCity11605 = {
  id: "01a0d5dd-6d4f-7263-a7d4-65afe4035b20",
  type: "page-type/temper-world-skyshard",
  slug: "imperial-city-1160-5",
  title: "Imperial City skyshard 5 of achievement 1160",
  esoAchievementId: 1160,
  shardNumber: 5,
  worldZone: "temper-world-zone/imperial-city",
  mapPositions: [
    { mapFolder: "cyrodiil", mapTile: "imperialcity_base", mapX: 0.1589, mapY: 0.5419 },
  ],
} as const satisfies TemperWorldSkyshard
