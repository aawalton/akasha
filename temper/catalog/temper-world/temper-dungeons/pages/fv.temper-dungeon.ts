import type { TemperDungeon } from "akasha/temper/catalog/temper-world/temper-dungeons/temper-dungeon.page-type.types.ts"

export const fv = {
  id: "01a05fc5-7427-7504-89e1-fdbdc5595a7f",
  type: "temper-dungeon",
  slug: "fv",
  title: "Frostvault",
  key: "FV",
  questGiver: "urgarlag-chief-bane",
  rotationPosition: 11,
  soloDifficulty: "hard",
} as const satisfies TemperDungeon
