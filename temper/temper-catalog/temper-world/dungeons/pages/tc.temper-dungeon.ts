import type { TemperDungeon } from "../temper-dungeon.page-type.ts"

export const tc = {
  id: "01a05fc5-742c-7eba-bc95-44d06b5c1956",
  pageTypeSlug: "temper-dungeon",
  slug: "tc",
  title: "The Cauldron",
  key: "TC",
  questGiver: "urgarlag-chief-bane",
  rotationPosition: 19,
  soloDifficulty: "hard",
} as const satisfies TemperDungeon
