import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const auridon6954 = {
  id: "01a0d5df-3d92-734a-af5c-f733e1bebbcc",
  type: "page-type/temper-world-skyshard",
  slug: "auridon-695-4",
  title: "Auridon skyshard 4 of achievement 695",
  esoAchievementId: 695,
  shardNumber: 4,
  worldZone: "temper-world-zone/auridon",
  mapPositions: [
    { mapFolder: "auridon", mapTile: "auridon_base", mapX: 0.689, mapY: 0.5158, placeKinds: [1] },
    { mapFolder: "auridon", mapTile: "skywatch_base", mapX: 0.5469, mapY: 0.5537 },
  ],
} as const satisfies TemperWorldSkyshard
