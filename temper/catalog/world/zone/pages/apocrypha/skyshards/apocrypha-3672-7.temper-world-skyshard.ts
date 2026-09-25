import type { TemperWorldSkyshard } from "akasha/temper/catalog/world/skyshard/temper-world-skyshard/temper-world-skyshard.page-type.types.ts"

export const apocrypha36727 = {
  id: "01a0d5e1-2303-79cc-93f3-1781b243e77c",
  type: "page-type/temper-world-skyshard",
  slug: "apocrypha-3672-7",
  title: "Apocrypha skyshard 7 of achievement 3672",
  esoAchievementId: 3672,
  shardNumber: 7,
  worldZone: "temper-world-zone/apocrypha",
  mapPositions: [
    {
      mapFolder: "apocrypha",
      mapTile: "u38_apocrypha_base",
      mapX: 0.4746365547,
      mapY: 0.4754182696,
      placeKinds: [4],
    },
    {
      mapFolder: "telvanni",
      mapTile: "u38_tunnel2_base",
      mapX: 0.5926405787,
      mapY: 0.120041646,
      placeKinds: [4],
    },
  ],
} as const satisfies TemperWorldSkyshard
