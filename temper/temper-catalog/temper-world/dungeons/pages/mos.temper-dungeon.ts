import type { TemperDungeon } from "../temper-dungeon.page-type.ts"

export const mos = {
  id: "01a05fc5-7429-7f0b-9cfc-1ae6388f6912",
  pageTypeSlug: "temper-dungeon",
  slug: "mos",
  title: "March of Sacrifices",
  key: "MOS",
  questGiver: "urgarlag-chief-bane",
  rotationPosition: 8,
  soloDifficulty: "hard",
} as const satisfies TemperDungeon
