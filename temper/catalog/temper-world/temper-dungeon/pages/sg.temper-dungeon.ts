import type { TemperDungeon } from "akasha/temper/catalog/temper-world/temper-dungeon/temper-dungeon.page-type.types.ts"

export const sg = {
  id: "01a05fc5-742b-7361-a38b-010c47385b7c",
  type: "page-type/temper-dungeon",
  slug: "sg",
  title: "Stone Garden",
  key: "SG",
  questGiver: "temper-quest-giver/urgarlag-chief-bane",
  rotationPosition: 17,
  soloDifficulty: "hard",
} as const satisfies TemperDungeon
