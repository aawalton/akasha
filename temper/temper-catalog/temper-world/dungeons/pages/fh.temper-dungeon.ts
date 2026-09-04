import type { TemperDungeon } from "../temper-dungeon.page-type.ts"

export const fh = {
  id: "01a05fc5-7427-7127-a54d-a5bbb5aeaf63",
  pageTypeSlug: "temper-dungeon",
  slug: "fh",
  title: "Falkreath Hold",
  key: "FH",
  questGiver: "urgarlag-chief-bane",
  rotationPosition: 5,
  soloDifficulty: "hard",
} as const satisfies TemperDungeon
