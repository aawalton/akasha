import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const westernSkyrim268714 = {
  id: "01a0d5e0-c9eb-74c8-90db-67fc4d7812ed",
  type: "page-type/temper-world-skyshard",
  slug: "western-skyrim-2687-14",
  title: "Western Skyrim skyshard 14 of achievement 2687",
  esoAchievementId: 2687,
  shardNumber: 14,
  worldZone: "temper-world-zone/western-skyrim",
  mapPositions: [
    { mapFolder: "skyrim", mapTile: "dragonhome_base", mapX: 0.5861, mapY: 0.6119 },
    {
      mapFolder: "skyrim",
      mapTile: "westernskryim_base",
      mapX: 0.1156,
      mapY: 0.4351,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard
