import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const summerset184517 = {
  id: "01a0d5e5-0fff-7ce9-a50c-87bcddc80c72",
  type: "page-type/temper-world-skyshard",
  slug: "summerset-1845-17",
  title: "Summerset skyshard 17 of achievement 1845",
  esoAchievementId: 1845,
  shardNumber: 17,
  worldZone: "temper-world-zone/summerset",
  mapPositions: [
    {
      mapFolder: "summerset",
      mapTile: "summerset_base",
      mapX: 0.2669,
      mapY: 0.5216,
      placeKinds: [2],
    },
    {
      mapFolder: "summerset",
      mapTile: "wastencoraldale_base",
      mapX: 0.3842,
      mapY: 0.4512,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard
