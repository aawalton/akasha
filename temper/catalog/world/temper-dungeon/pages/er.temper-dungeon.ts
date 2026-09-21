import type { TemperDungeon } from "akasha/temper/catalog/world/temper-dungeon/temper-dungeon.page-type.types.ts"

export const er = {
  id: "01a05fc5-7426-7954-8583-bcb57b3f44d2",
  type: "page-type/temper-dungeon",
  slug: "er",
  title: "Exiled Redoubt",
  key: "ER",
  questGiver: "temper-quest-giver/urgarlag-chief-bane",
  rotationPosition: 30,
  soloDifficulty: "hard",
} as const satisfies TemperDungeon
