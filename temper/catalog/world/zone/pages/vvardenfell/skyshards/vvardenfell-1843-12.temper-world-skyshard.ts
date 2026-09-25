import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const vvardenfell184312 = {
  id: "01a0d5e1-c15d-7991-a137-725d862e5530",
  type: "page-type/temper-world-skyshard",
  slug: "vvardenfell-1843-12",
  title: "Vvardenfell skyshard 12 of achievement 1843",
  esoAchievementId: 1843,
  shardNumber: 12,
  worldZone: "temper-world-zone/vvardenfell",
  mapPositions: [
    {
      mapFolder: "vvardenfell",
      mapTile: "cavernsofkogoruhnfw03_base",
      mapX: 0.4009,
      mapY: 0.4427,
      placeKinds: [3],
    },
    {
      mapFolder: "vvardenfell",
      mapTile: "vvardenfell_base",
      mapX: 0.522,
      mapY: 0.256,
      placeKinds: [3],
    },
  ],
} as const satisfies TemperWorldSkyshard
