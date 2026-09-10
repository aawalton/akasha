import type { TemperDungeon } from "../temper-dungeon.page-type.types.ts"

export const tdc = {
  id: "01a05fc5-742c-7d60-876a-22458e7b15f5",
  pageTypeSlug: "temper-dungeon",
  type: "temper-dungeon",
  slug: "tdc",
  title: "The Dread Cellar",
  key: "TDC",
  questGiver: "urgarlag-chief-bane",
  rotationPosition: 21,
  soloDifficulty: "hard",
} as const satisfies TemperDungeon
