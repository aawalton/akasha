import type { TemperDungeon } from "akasha/temper/catalog/temper-world/temper-dungeon/temper-dungeon.page-type.types.ts"

export const sc1 = {
  id: "01a05fc5-742b-7a1f-a14e-f60b55b5f789",
  type: "page-type/temper-dungeon",
  slug: "sc1",
  title: "Spindleclutch I",
  key: "SC1",
  questGiver: "temper-quest-giver/maj-al-ragath",
  rotationPosition: 3,
  soloDifficulty: "easy",
} as const satisfies TemperDungeon
