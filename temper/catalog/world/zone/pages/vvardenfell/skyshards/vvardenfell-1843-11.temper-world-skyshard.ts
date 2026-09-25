import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const vvardenfell184311 = {
  id: "01a0d5e1-c15d-736b-b092-9799b275a99b",
  type: "page-type/temper-world-skyshard",
  slug: "vvardenfell-1843-11",
  title: "Vvardenfell skyshard 11 of achievement 1843",
  esoAchievementId: 1843,
  shardNumber: 11,
  worldZone: "temper-world-zone/vvardenfell",
  mapPositions: [
    {
      mapFolder: "vvardenfell",
      mapTile: "nchuleftingth5_base",
      mapX: 0.309,
      mapY: 0.5958,
      placeKinds: [3],
    },
    {
      mapFolder: "vvardenfell",
      mapTile: "vvardenfell_base",
      mapX: 0.6689,
      mapY: 0.6572,
      placeKinds: [3],
    },
  ],
} as const satisfies TemperWorldSkyshard
