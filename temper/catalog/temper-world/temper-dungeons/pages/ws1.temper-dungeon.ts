import type { TemperDungeon } from "akasha/temper/catalog/temper-world/temper-dungeons/temper-dungeon.page-type.types.ts"

export const ws1 = {
  id: "01a05fc5-742e-7de6-b585-1a8dab580554",
  type: "temper-dungeon",
  slug: "ws1",
  title: "Wayrest Sewers I",
  key: "WS1",
  questGiver: "maj-al-ragath",
  rotationPosition: 11,
  soloDifficulty: "easy",
} as const satisfies TemperDungeon
