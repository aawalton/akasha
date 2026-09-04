import type { TemperDungeon } from "../temper-dungeon.page-type.ts"

export const mhk = {
  id: "01a05fc5-7429-7be6-b964-b1f353f26f86",
  pageTypeSlug: "temper-dungeon",
  slug: "mhk",
  title: "Moon Hunter Keep",
  key: "MHK",
  questGiver: "urgarlag-chief-bane",
  rotationPosition: 9,
  soloDifficulty: "hard",
} as const satisfies TemperDungeon
