import type { TemperDungeon } from "../temper-dungeon.page-type.ts"

export const ug = {
  id: "01a05fc5-742d-78e6-adc4-0380f8c3ff20",
  pageTypeSlug: "temper-dungeon",
  slug: "ug",
  title: "Unhallowed Grave",
  key: "UG",
  questGiver: "urgarlag-chief-bane",
  rotationPosition: 15,
  soloDifficulty: "hard",
} as const satisfies TemperDungeon
