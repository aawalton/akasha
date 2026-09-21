import type { TemperDungeon } from "akasha/temper/catalog/world/temper-dungeon/temper-dungeon.page-type.types.ts"

export const ws2 = {
  id: "01a05fc5-742e-788a-81f4-de86179b7616",
  type: "page-type/temper-dungeon",
  slug: "ws2",
  title: "Wayrest Sewers II",
  key: "WS2",
  questGiver: "temper-quest-giver/maj-al-ragath",
  rotationPosition: 6,
  soloDifficulty: "hard",
} as const satisfies TemperDungeon
