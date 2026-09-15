import type { TemperDungeon } from "akasha/temper/catalog/temper-world/temper-dungeon/temper-dungeon.page-type.types.ts"

export const bf = {
  id: "01a05fc5-7421-760b-b525-a2c8ba4f17fc",
  type: "page-type/temper-dungeon",
  slug: "bf",
  title: "Bloodroot Forge",
  key: "BF",
  questGiver: "temper-quest-giver/urgarlag-chief-bane",
  rotationPosition: 4,
  soloDifficulty: "hard",
} as const satisfies TemperDungeon
