import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const westernSkyrim26876 = {
  id: "01a0d5e0-c9ec-76d7-aa6c-c61b2780ef0f",
  type: "page-type/temper-world-skyshard",
  slug: "western-skyrim-2687-6",
  title: "Western Skyrim skyshard 6 of achievement 2687",
  esoAchievementId: 2687,
  shardNumber: 6,
  worldZone: "temper-world-zone/western-skyrim",
  mapPositions: [
    { mapFolder: "skyrim", mapTile: "westernskryim_base", mapX: 0.6197, mapY: 0.4321 },
  ],
} as const satisfies TemperWorldSkyshard
