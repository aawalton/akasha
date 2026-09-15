import type { TemperDungeon } from "akasha/temper/catalog/temper-world/temper-dungeon/temper-dungeon.page-type.types.ts"

export const sr = {
  id: "01a05fc5-742c-7900-a3fb-3e9f7a089d7e",
  type: "page-type/temper-dungeon",
  slug: "sr",
  title: "Shipwright's Regret",
  key: "SR",
  questGiver: "temper-quest-giver/urgarlag-chief-bane",
  rotationPosition: 23,
  soloDifficulty: "hard",
} as const satisfies TemperDungeon
