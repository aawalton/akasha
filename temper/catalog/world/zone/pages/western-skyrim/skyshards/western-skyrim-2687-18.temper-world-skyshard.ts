import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const westernSkyrim268718 = {
  id: "01a0d5e0-c9eb-786a-add4-5874027ea7bf",
  type: "page-type/temper-world-skyshard",
  slug: "western-skyrim-2687-18",
  title: "Western Skyrim skyshard 18 of achievement 2687",
  esoAchievementId: 2687,
  shardNumber: 18,
  worldZone: "temper-world-zone/western-skyrim",
  mapPositions: [
    {
      mapFolder: "skyrim",
      mapTile: "blackreach_base",
      mapX: 0.0835,
      mapY: 0.3666,
      placeKinds: [2],
    },
    { mapFolder: "skyrim", mapTile: "thescraps_base", mapX: 0.7254, mapY: 0.5049 },
  ],
} as const satisfies TemperWorldSkyshard
