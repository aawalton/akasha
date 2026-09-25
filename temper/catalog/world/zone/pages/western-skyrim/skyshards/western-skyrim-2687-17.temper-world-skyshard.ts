import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const westernSkyrim268717 = {
  id: "01a0d5e0-c9eb-70c2-b19f-38dc0c28bb28",
  type: "page-type/temper-world-skyshard",
  slug: "western-skyrim-2687-17",
  title: "Western Skyrim skyshard 17 of achievement 2687",
  esoAchievementId: 2687,
  shardNumber: 17,
  worldZone: "temper-world-zone/western-skyrim",
  mapPositions: [
    { mapFolder: "skyrim", mapTile: "shadowgreen_lower_base", mapX: 0.452, mapY: 0.616 },
    { mapFolder: "skyrim", mapTile: "shadowgreen_upper_base", mapX: 0.452, mapY: 0.616 },
    {
      mapFolder: "skyrim",
      mapTile: "westernskryim_base",
      mapX: 0.4854,
      mapY: 0.3021,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard
