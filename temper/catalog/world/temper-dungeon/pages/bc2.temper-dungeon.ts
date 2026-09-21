import type { TemperDungeon } from "akasha/temper/catalog/world/temper-dungeon/temper-dungeon.page-type.types.ts"

export const bc2 = {
  id: "01a05fc5-7420-7b1a-9f98-8f1480068cc8",
  type: "page-type/temper-dungeon",
  slug: "bc2",
  title: "Banished Cells II",
  key: "BC2",
  questGiver: "temper-quest-giver/maj-al-ragath",
  rotationPosition: 8,
  soloDifficulty: "medium",
} as const satisfies TemperDungeon
