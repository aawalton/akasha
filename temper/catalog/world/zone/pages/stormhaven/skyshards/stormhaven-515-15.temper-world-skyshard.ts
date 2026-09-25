import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const stormhaven51515 = {
  id: "01a0d5dd-463a-746f-b981-c112a1e200ce",
  type: "page-type/temper-world-skyshard",
  slug: "stormhaven-515-15",
  title: "Stormhaven skyshard 15 of achievement 515",
  esoAchievementId: 515,
  shardNumber: 15,
  worldZone: "temper-world-zone/stormhaven",
  mapPositions: [
    { mapFolder: "stormhaven", mapTile: "portdunwatch_base", mapX: 0.706, mapY: 0.446 },
    {
      mapFolder: "stormhaven",
      mapTile: "stormhaven_base",
      mapX: 0.308,
      mapY: 0.323,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard
