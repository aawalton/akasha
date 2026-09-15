import type { TemperDungeon } from "akasha/temper/catalog/temper-world/temper-dungeon/temper-dungeon.page-type.types.ts"

export const vm = {
  id: "01a05fc5-742d-7142-ad4c-1b3f65a72b0f",
  type: "page-type/temper-dungeon",
  slug: "vm",
  title: "Vaults of Madness",
  key: "VM",
  questGiver: "temper-quest-giver/glirion-the-redbeard",
  rotationPosition: 1,
  soloDifficulty: "easy",
} as const satisfies TemperDungeon
