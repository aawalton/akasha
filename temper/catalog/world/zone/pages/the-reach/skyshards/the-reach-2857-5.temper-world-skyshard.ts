import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const theReach28575 = {
  id: "01a0d5e1-6a7f-7cbf-b018-12aecd22ccb8",
  type: "page-type/temper-world-skyshard",
  slug: "the-reach-2857-5",
  title: "The Reach skyshard 5 of achievement 2857",
  esoAchievementId: 2857,
  shardNumber: 5,
  worldZone: "temper-world-zone/the-reach",
  mapPositions: [
    {
      mapFolder: "reach",
      mapTile: "briarrockruins_ext_base",
      mapX: 0.341515928506,
      mapY: 0.621803820133,
    },
    {
      mapFolder: "reach",
      mapTile: "reach_base",
      mapX: 0.336136519908,
      mapY: 0.664194226264,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard
