import type { TemperDungeon } from "akasha/temper/catalog/temper-world/temper-dungeon/temper-dungeon.page-type.types.ts"

export const bdv = {
  id: "01a05fc5-7420-702c-846a-c29e89574d9d",
  type: "page-type/temper-dungeon",
  slug: "bdv",
  title: "Black Drake Villa",
  key: "BDV",
  questGiver: "temper-quest-giver/urgarlag-chief-bane",
  rotationPosition: 18,
  soloDifficulty: "hard",
} as const satisfies TemperDungeon
