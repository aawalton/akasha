import type { TemperDungeon } from "akasha/temper/catalog/temper-world/temper-dungeon/temper-dungeon.page-type.types.ts"

export const ch1 = {
  id: "01a05fc5-7423-7365-bfbd-5bab113034cf",
  type: "page-type/temper-dungeon",
  slug: "ch1",
  title: "Crypt of Hearts I",
  key: "CH1",
  questGiver: "temper-quest-giver/glirion-the-redbeard",
  rotationPosition: 9,
  soloDifficulty: "easy",
} as const satisfies TemperDungeon
