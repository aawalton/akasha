import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const stormhaven51511 = {
  id: "01a0d5dd-4639-7ec2-8dce-d4393526380b",
  type: "page-type/temper-world-skyshard",
  slug: "stormhaven-515-11",
  title: "Stormhaven skyshard 11 of achievement 515",
  esoAchievementId: 515,
  shardNumber: 11,
  worldZone: "temper-world-zone/stormhaven",
  mapPositions: [
    { mapFolder: "stormhaven", mapTile: "farangelsdelve_base", mapX: 0.754, mapY: 0.087 },
    {
      mapFolder: "stormhaven",
      mapTile: "stormhaven_base",
      mapX: 0.389,
      mapY: 0.653,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard
