import type { TemperDungeon } from "akasha/temper/catalog/temper-world/temper-dungeons/temper-dungeon.page-type.types.ts"

export const tc = {
  id: "01a05fc5-742c-7eba-bc95-44d06b5c1956",
  type: "temper-dungeon",
  slug: "tc",
  title: "The Cauldron",
  key: "TC",
  questGiver: "urgarlag-chief-bane",
  rotationPosition: 19,
  soloDifficulty: "hard",
} as const satisfies TemperDungeon
