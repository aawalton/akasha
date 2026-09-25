import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const greenshade68311 = {
  id: "01a0d5de-2b0c-7804-99ce-3d021398e6b3",
  type: "page-type/temper-world-skyshard",
  slug: "greenshade-683-11",
  title: "Greenshade skyshard 11 of achievement 683",
  esoAchievementId: 683,
  shardNumber: 11,
  worldZone: "temper-world-zone/greenshade",
  mapPositions: [
    { mapFolder: "greenshade", mapTile: "caracdena_base", mapX: 0.541, mapY: 0.492 },
    {
      mapFolder: "greenshade",
      mapTile: "greenshade_base",
      mapX: 0.579,
      mapY: 0.895,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard
