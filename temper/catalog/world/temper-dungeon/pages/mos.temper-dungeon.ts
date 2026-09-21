import type { TemperDungeon } from "akasha/temper/catalog/world/temper-dungeon/temper-dungeon.page-type.types.ts"

export const mos = {
  id: "01a05fc5-7429-7f0b-9cfc-1ae6388f6912",
  type: "page-type/temper-dungeon",
  slug: "mos",
  title: "March of Sacrifices",
  key: "MOS",
  questGiver: "temper-quest-giver/urgarlag-chief-bane",
  rotationPosition: 8,
  soloDifficulty: "hard",
} as const satisfies TemperDungeon
