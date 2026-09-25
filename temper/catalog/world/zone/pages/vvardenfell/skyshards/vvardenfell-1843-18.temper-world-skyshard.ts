import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const vvardenfell184318 = {
  id: "01a0d5e1-c15e-7afb-a1cc-02f76fc12ea3",
  type: "page-type/temper-world-skyshard",
  slug: "vvardenfell-1843-18",
  title: "Vvardenfell skyshard 18 of achievement 1843",
  esoAchievementId: 1843,
  shardNumber: 18,
  worldZone: "temper-world-zone/vvardenfell",
  mapPositions: [
    {
      mapFolder: "vvardenfell",
      mapTile: "nchuleftdepths_base",
      mapX: 0.6077,
      mapY: 0.5814,
      placeKinds: [2],
    },
    {
      mapFolder: "vvardenfell",
      mapTile: "vvardenfell_base",
      mapX: 0.6121,
      mapY: 0.3294,
      placeKinds: [2],
    },
  ],
} as const satisfies TemperWorldSkyshard
