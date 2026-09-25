import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const westernSkyrim26877 = {
  id: "01a0d5e0-c9ec-7cfa-bdc2-08df6368e0d5",
  type: "page-type/temper-world-skyshard",
  slug: "western-skyrim-2687-7",
  title: "Western Skyrim skyshard 7 of achievement 2687",
  esoAchievementId: 2687,
  shardNumber: 7,
  worldZone: "temper-world-zone/western-skyrim",
  mapPositions: [
    { mapFolder: "skyrim", mapTile: "westernskryim_base", mapX: 0.3164, mapY: 0.7052 },
  ],
} as const satisfies TemperWorldSkyshard
