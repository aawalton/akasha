import type { TemperDungeon } from "akasha/temper/catalog/temper-world/temper-dungeons/temper-dungeon.page-type.types.ts"

export const ls = {
  id: "01a05fc5-7429-75b6-8398-66054d131c4e",
  type: "temper-dungeon",
  slug: "ls",
  title: "Lep Seclusa",
  key: "LS",
  questGiver: "urgarlag-chief-bane",
  rotationPosition: 31,
  soloDifficulty: "hard",
} as const satisfies TemperDungeon
