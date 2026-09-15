import type { TemperDungeon } from "akasha/temper/catalog/temper-world/temper-dungeon/temper-dungeon.page-type.types.ts"

export const ti = {
  id: "01a05fc5-742d-74bc-8df1-b5522c81a106",
  type: "temper-dungeon",
  slug: "ti",
  title: "Tempest Island",
  key: "TI",
  questGiver: "temper-quest-giver/glirion-the-redbeard",
  rotationPosition: 4,
  soloDifficulty: "easy",
} as const satisfies TemperDungeon
