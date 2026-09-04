import type { TemperDungeon } from "../temper-dungeon.page-type.ts"

export const bc = {
  id: "01a05fc5-7420-73ef-8f6e-a4550c4a2fb4",
  pageTypeSlug: "temper-dungeon",
  slug: "bc",
  title: "Blessed Crucible",
  key: "BC",
  questGiver: "glirion-the-redbeard",
  rotationPosition: 11,
  soloDifficulty: "easy",
} as const satisfies TemperDungeon
