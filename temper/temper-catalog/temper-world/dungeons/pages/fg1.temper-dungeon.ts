import type { TemperDungeon } from "../temper-dungeon.page-type.ts"

export const fg1 = {
  id: "01a05fc5-7426-78e8-b4cf-cc1c192f8889",
  pageTypeSlug: "temper-dungeon",
  slug: "fg1",
  title: "Fungal Grotto I",
  key: "FG1",
  questGiver: "maj-al-ragath",
  rotationPosition: 7,
  soloDifficulty: "easy",
} as const satisfies TemperDungeon
