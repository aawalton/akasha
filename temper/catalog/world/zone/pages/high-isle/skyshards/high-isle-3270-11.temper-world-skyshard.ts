import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const highIsle327011 = {
  id: "01a0d5de-f9bf-74d9-85df-d1a60a513e17",
  type: "page-type/temper-world-skyshard",
  slug: "high-isle-3270-11",
  title: "High Isle skyshard 11 of achievement 3270",
  esoAchievementId: 3270,
  shardNumber: 11,
  worldZone: "temper-world-zone/high-isle",
  mapPositions: [
    {
      mapFolder: "systres",
      mapTile: "u34_ghosthaven_base",
      mapX: 0.6281458735,
      mapY: 0.5921931266,
      placeKinds: [3],
    },
    {
      mapFolder: "systres",
      mapTile: "u34_ghosthavenext_base",
      mapX: 0.8324697613,
      mapY: 0.7328727841,
      placeKinds: [3],
    },
    {
      mapFolder: "systres",
      mapTile: "u34_systreszone_base",
      mapX: 0.8649539351,
      mapY: 0.4046482443,
      placeKinds: [3],
    },
  ],
} as const satisfies TemperWorldSkyshard
