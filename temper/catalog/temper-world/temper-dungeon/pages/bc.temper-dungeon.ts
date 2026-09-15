import type { TemperDungeon } from "akasha/temper/catalog/temper-world/temper-dungeon/temper-dungeon.page-type.types.ts"

export const bc = {
  id: "01a05fc5-7420-73ef-8f6e-a4550c4a2fb4",
  type: "page-type/temper-dungeon",
  slug: "bc",
  title: "Blessed Crucible",
  key: "BC",
  questGiver: "temper-quest-giver/glirion-the-redbeard",
  rotationPosition: 11,
  soloDifficulty: "easy",
} as const satisfies TemperDungeon
