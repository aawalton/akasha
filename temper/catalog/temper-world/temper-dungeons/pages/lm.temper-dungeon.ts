import type { TemperDungeon } from "../temper-dungeon.page-type.types.ts"

export const lm = {
  id: "01a05fc5-7428-76d3-8ed2-cb960f969a5c",
  pageTypeSlug: "temper-dungeon",
  type: "temper-dungeon",
  slug: "lm",
  title: "Lair of Maarselok",
  key: "LM",
  questGiver: "urgarlag-chief-bane",
  rotationPosition: 12,
  soloDifficulty: "hard",
} as const satisfies TemperDungeon
