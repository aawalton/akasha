import type { TemperDungeon } from "../temper-dungeon.page-type.ts"

export const dc1 = {
  id: "01a05fc5-7424-7fca-b9d1-a796077c77c8",
  pageTypeSlug: "temper-dungeon",
  slug: "dc1",
  title: "Darkshade Caverns I",
  key: "DC1",
  questGiver: "maj-al-ragath",
  rotationPosition: 9,
  soloDifficulty: "easy",
} as const satisfies TemperDungeon
