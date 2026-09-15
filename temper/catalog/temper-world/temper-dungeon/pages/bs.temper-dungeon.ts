import type { TemperDungeon } from "akasha/temper/catalog/temper-world/temper-dungeon/temper-dungeon.page-type.types.ts"

export const bs = {
  id: "01a05fc5-7422-7acc-b36b-27c6f3521aa5",
  type: "page-type/temper-dungeon",
  slug: "bs",
  title: "Bal Sunnar",
  key: "BS",
  questGiver: "temper-quest-giver/urgarlag-chief-bane",
  rotationPosition: 26,
  soloDifficulty: "hard",
} as const satisfies TemperDungeon
