import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const highIsle327016 = {
  id: "01a0d5de-f9bf-791a-b542-5e3e84bbb5f0",
  type: "page-type/temper-world-skyshard",
  slug: "high-isle-3270-16",
  title: "High Isle skyshard 16 of achievement 3270",
  esoAchievementId: 3270,
  shardNumber: 16,
  worldZone: "temper-world-zone/high-isle",
  mapPositions: [
    {
      mapFolder: "systres",
      mapTile: "u34_shipwreckshoalsext_base",
      mapX: 0.3591299951,
      mapY: 0.6580677628,
      placeKinds: [2],
    },
    {
      mapFolder: "systres",
      mapTile: "u34_systreszone_base",
      mapX: 0.4803281426,
      mapY: 0.4857603907,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard
