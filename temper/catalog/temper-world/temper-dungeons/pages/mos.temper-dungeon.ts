import type { TemperDungeon } from "akasha/temper/catalog/temper-world/temper-dungeons/temper-dungeon.page-type.types.ts"

export const mos = {
  id: "01a05fc5-7429-7f0b-9cfc-1ae6388f6912",
  type: "temper-dungeon",
  slug: "mos",
  title: "March of Sacrifices",
  key: "MOS",
  questGiver: "urgarlag-chief-bane",
  rotationPosition: 8,
  soloDifficulty: "hard",
} as const satisfies TemperDungeon
