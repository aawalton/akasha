import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const westernSkyrim268713 = {
  id: "01a0d5e0-c9eb-77cd-904f-06d0eb62cb79",
  type: "page-type/temper-world-skyshard",
  slug: "western-skyrim-2687-13",
  title: "Western Skyrim skyshard 13 of achievement 2687",
  esoAchievementId: 2687,
  shardNumber: 13,
  worldZone: "temper-world-zone/western-skyrim",
  mapPositions: [
    { mapFolder: "skyrim", mapTile: "chillwinddepths_base", mapX: 0.8658, mapY: 0.5503 },
    {
      mapFolder: "skyrim",
      mapTile: "westernskryim_base",
      mapX: 0.3657,
      mapY: 0.6128,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard
