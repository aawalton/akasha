import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const westernSkyrim268710 = {
  id: "01a0d5e0-c9eb-778f-a4a3-981f9f98619b",
  type: "page-type/temper-world-skyshard",
  slug: "western-skyrim-2687-10",
  title: "Western Skyrim skyshard 10 of achievement 2687",
  esoAchievementId: 2687,
  shardNumber: 10,
  worldZone: "temper-world-zone/western-skyrim",
  mapPositions: [
    { mapFolder: "skyrim", mapTile: "westernskryim_base", mapX: 0.5059, mapY: 0.5786 },
  ],
} as const satisfies TemperWorldSkyshard
