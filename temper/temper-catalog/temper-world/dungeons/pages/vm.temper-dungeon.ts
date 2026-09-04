import type { TemperDungeon } from "../temper-dungeon.page-type.ts"

export const vm = {
  id: "01a05fc5-742d-7142-ad4c-1b3f65a72b0f",
  pageTypeSlug: "temper-dungeon",
  slug: "vm",
  title: "Vaults of Madness",
  key: "VM",
  questGiver: "glirion-the-redbeard",
  rotationPosition: 1,
  soloDifficulty: "easy",
} as const satisfies TemperDungeon
