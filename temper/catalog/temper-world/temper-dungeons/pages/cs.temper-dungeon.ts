import type { TemperDungeon } from "akasha/temper/catalog/temper-world/temper-dungeons/temper-dungeon.page-type.types.ts"

export const cs = {
  id: "01a05fc5-7423-711f-8589-9a405121b472",
  type: "temper-dungeon",
  slug: "cs",
  title: "Cradle of Shadows",
  key: "CS",
  questGiver: "urgarlag-chief-bane",
  rotationPosition: 2,
  soloDifficulty: "hard",
} as const satisfies TemperDungeon
