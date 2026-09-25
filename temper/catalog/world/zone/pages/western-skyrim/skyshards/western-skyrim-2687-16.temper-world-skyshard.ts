import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const westernSkyrim268716 = {
  id: "01a0d5e0-c9eb-7517-aef5-28ba2f8d3d0b",
  type: "page-type/temper-world-skyshard",
  slug: "western-skyrim-2687-16",
  title: "Western Skyrim skyshard 16 of achievement 2687",
  esoAchievementId: 2687,
  shardNumber: 16,
  worldZone: "temper-world-zone/western-skyrim",
  mapPositions: [
    {
      mapFolder: "skyrim",
      mapTile: "blackreach_base",
      mapX: 0.7669,
      mapY: 0.3685,
      placeKinds: [2],
    },
    { mapFolder: "skyrim", mapTile: "midnightbarrow_base", mapX: 0.7051, mapY: 0.4036 },
  ],
} as const satisfies TemperWorldSkyshard
