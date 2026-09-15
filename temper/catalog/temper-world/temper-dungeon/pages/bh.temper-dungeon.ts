import type { TemperDungeon } from "akasha/temper/catalog/temper-world/temper-dungeon/temper-dungeon.page-type.types.ts"

export const bh = {
  id: "01a05fc5-7422-7c35-9d5c-731480284ac8",
  type: "page-type/temper-dungeon",
  slug: "bh",
  title: "Blackheart Haven",
  key: "BH",
  questGiver: "temper-quest-giver/glirion-the-redbeard",
  rotationPosition: 5,
  soloDifficulty: "hard",
} as const satisfies TemperDungeon
