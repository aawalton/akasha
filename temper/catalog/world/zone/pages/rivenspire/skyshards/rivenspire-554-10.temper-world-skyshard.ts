import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const rivenspire55410 = {
  id: "01a0d5df-d861-7859-bc0f-36d427643a27",
  type: "page-type/temper-world-skyshard",
  slug: "rivenspire-554-10",
  title: "Rivenspire skyshard 10 of achievement 554",
  esoAchievementId: 554,
  shardNumber: 10,
  worldZone: "temper-world-zone/rivenspire",
  mapPositions: [
    { mapFolder: "rivenspire", mapTile: "crestshademine_base", mapX: 0.5223, mapY: 0.4445 },
    {
      mapFolder: "rivenspire",
      mapTile: "rivenspire_base",
      mapX: 0.357,
      mapY: 0.49,
      placeKinds: [2],
    },
    {
      mapFolder: "rivenspire",
      mapTile: "shornhelm_base",
      mapX: 0.036,
      mapY: 0.077,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard
