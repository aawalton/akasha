import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const westernSkyrim268712 = {
  id: "01a0d5e0-c9eb-74c6-9a26-0bc4ae749230",
  type: "page-type/temper-world-skyshard",
  slug: "western-skyrim-2687-12",
  title: "Western Skyrim skyshard 12 of achievement 2687",
  esoAchievementId: 2687,
  shardNumber: 12,
  worldZone: "temper-world-zone/western-skyrim",
  mapPositions: [
    {
      mapFolder: "skyrim",
      mapTile: "blackreach_base",
      mapX: 0.5867,
      mapY: 0.5876,
      placeKinds: [3],
    },
    { mapFolder: "skyrim", mapTile: "nchuthnkarst_base", mapX: 0.6816, mapY: 0.6035 },
  ],
} as const satisfies TemperWorldSkyshard
