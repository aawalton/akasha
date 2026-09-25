import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const westernSkyrim26878 = {
  id: "01a0d5e0-c9ec-71ca-a17f-58bd53fea2db",
  type: "page-type/temper-world-skyshard",
  slug: "western-skyrim-2687-8",
  title: "Western Skyrim skyshard 8 of achievement 2687",
  esoAchievementId: 2687,
  shardNumber: 8,
  worldZone: "temper-world-zone/western-skyrim",
  mapPositions: [
    { mapFolder: "skyrim", mapTile: "westernskryim_base", mapX: 0.6698, mapY: 0.6519 },
  ],
} as const satisfies TemperWorldSkyshard
