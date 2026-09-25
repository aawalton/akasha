import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const westernSkyrim268715 = {
  id: "01a0d5e0-c9eb-7e87-bf5a-be029b4f8867",
  type: "page-type/temper-world-skyshard",
  slug: "western-skyrim-2687-15",
  title: "Western Skyrim skyshard 15 of achievement 2687",
  esoAchievementId: 2687,
  shardNumber: 15,
  worldZone: "temper-world-zone/western-skyrim",
  mapPositions: [
    { mapFolder: "skyrim", mapTile: "frozencoast_base", mapX: 0.3566, mapY: 0.5842 },
    {
      mapFolder: "skyrim",
      mapTile: "westernskryim_base",
      mapX: 0.7457,
      mapY: 0.324,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard
