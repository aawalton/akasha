import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const westernSkyrim268711 = {
  id: "01a0d5e0-c9eb-7a32-b015-5c2784bdb1f4",
  type: "page-type/temper-world-skyshard",
  slug: "western-skyrim-2687-11",
  title: "Western Skyrim skyshard 11 of achievement 2687",
  esoAchievementId: 2687,
  shardNumber: 11,
  worldZone: "temper-world-zone/western-skyrim",
  mapPositions: [
    { mapFolder: "skyrim", mapTile: "labyrinthian_base", mapX: 0.5657, mapY: 0.4789 },
    {
      mapFolder: "skyrim",
      mapTile: "westernskryim_base",
      mapX: 0.7505,
      mapY: 0.6806,
      placeKinds: [3],
    },
  ],
} as const satisfies TemperWorldSkyshard
