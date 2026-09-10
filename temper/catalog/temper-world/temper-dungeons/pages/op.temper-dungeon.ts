import type { TemperDungeon } from "../temper-dungeon.page-type.types.ts"

export const op = {
  id: "01a05fc5-742a-70ed-aca8-da24309b1b9b",
  pageTypeSlug: "temper-dungeon",
  type: "temper-dungeon",
  slug: "op",
  title: "Oathsworn Pit",
  key: "OP",
  questGiver: "urgarlag-chief-bane",
  rotationPosition: 29,
  soloDifficulty: "hard",
} as const satisfies TemperDungeon
