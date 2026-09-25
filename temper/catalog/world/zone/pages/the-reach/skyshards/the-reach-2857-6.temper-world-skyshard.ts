import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const theReach28576 = {
  id: "01a0d5e1-6a7f-70d5-a80b-79afd0378201",
  type: "page-type/temper-world-skyshard",
  slug: "the-reach-2857-6",
  title: "The Reach skyshard 6 of achievement 2857",
  esoAchievementId: 2857,
  shardNumber: 6,
  worldZone: "temper-world-zone/the-reach",
  mapPositions: [
    { mapFolder: "reach", mapTile: "gloomreach2_base", mapX: 0.6464774012, mapY: 0.4073275923 },
    { mapFolder: "reach", mapTile: "gloomreach2b_base", mapX: 0.6464774012, mapY: 0.4073275923 },
    { mapFolder: "reach", mapTile: "gloomreach2c_base", mapX: 0.6464774012, mapY: 0.4073275923 },
    { mapFolder: "reach", mapTile: "gloomreach3_base", mapX: 0.6464774012, mapY: 0.4073275923 },
    { mapFolder: "reach", mapTile: "gloomreach5_base", mapX: 0.6464774012, mapY: 0.4073275923 },
    { mapFolder: "reach", mapTile: "gloomreach_base", mapX: 0.6464774012, mapY: 0.4073275923 },
    {
      mapFolder: "reach",
      mapTile: "reach_base",
      mapX: 0.730453908443,
      mapY: 0.699964821338,
      placeKinds: [2],
    },
    {
      mapFolder: "reach",
      mapTile: "u28_blackreach_base",
      mapX: 0.738115906715,
      mapY: 0.330711334943,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard
