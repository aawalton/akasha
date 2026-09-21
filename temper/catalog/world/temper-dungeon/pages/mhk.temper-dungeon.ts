import type { TemperDungeon } from "akasha/temper/catalog/world/temper-dungeon/temper-dungeon.page-type.types.ts"

export const mhk = {
  id: "01a05fc5-7429-7be6-b964-b1f353f26f86",
  type: "page-type/temper-dungeon",
  slug: "mhk",
  title: "Moon Hunter Keep",
  key: "MHK",
  questGiver: "temper-quest-giver/urgarlag-chief-bane",
  rotationPosition: 9,
  soloDifficulty: "hard",
} as const satisfies TemperDungeon
