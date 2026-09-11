import type { TemperDungeon } from "akasha/temper/catalog/temper-world/temper-dungeons/temper-dungeon.page-type.types.ts"

export const fl = {
  id: "01a05fc5-7427-78d5-8281-698a37adb597",
  type: "temper-dungeon",
  slug: "fl",
  title: "Fang Lair",
  key: "FL",
  questGiver: "urgarlag-chief-bane",
  rotationPosition: 6,
  soloDifficulty: "hard",
} as const satisfies TemperDungeon
