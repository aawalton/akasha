import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const westernSkyrim26879 = {
  id: "01a0d5e0-c9ec-7b66-9605-576701b611be",
  type: "page-type/temper-world-skyshard",
  slug: "western-skyrim-2687-9",
  title: "Western Skyrim skyshard 9 of achievement 2687",
  esoAchievementId: 2687,
  shardNumber: 9,
  worldZone: "temper-world-zone/western-skyrim",
  mapPositions: [
    { mapFolder: "skyrim", mapTile: "westernskryim_base", mapX: 0.2435, mapY: 0.4416 },
  ],
} as const satisfies TemperWorldSkyshard
