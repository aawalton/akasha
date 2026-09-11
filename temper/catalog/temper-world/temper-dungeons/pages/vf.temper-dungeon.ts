import type { TemperDungeon } from "akasha/temper/catalog/temper-world/temper-dungeons/temper-dungeon.page-type.types.ts"

export const vf = {
  id: "01a05fc5-742d-7dae-9f40-3752d65c2e9f",
  type: "temper-dungeon",
  slug: "vf",
  title: "Volenfell",
  key: "VF",
  questGiver: "glirion-the-redbeard",
  rotationPosition: 10,
  soloDifficulty: "easy",
} as const satisfies TemperDungeon
