import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const reapersMarch68510 = {
  id: "01a0d5d9-d4aa-7753-ba55-eef69fcc5b0b",
  type: "page-type/temper-world-skyshard",
  slug: "reapers-march-685-10",
  title: "Reaper's March skyshard 10 of achievement 685",
  esoAchievementId: 685,
  shardNumber: 10,
  worldZone: "temper-world-zone/reapers-march",
  mapPositions: [
    { mapFolder: "reapersmarch", mapTile: "kunasdelve_base", mapX: 0.752, mapY: 0.434 },
    {
      mapFolder: "reapersmarch",
      mapTile: "reapersmarch_base",
      mapX: 0.541,
      mapY: 0.301,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard
