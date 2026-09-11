import type { TemperDungeon } from "akasha/temper/catalog/temper-world/temper-dungeons/temper-dungeon.page-type.types.ts"

export const eh2 = {
  id: "01a05fc5-7426-7a88-a912-f74beadfdfa7",
  type: "temper-dungeon",
  slug: "eh2",
  title: "Elden Hollow II",
  key: "EH2",
  questGiver: "maj-al-ragath",
  rotationPosition: 10,
  soloDifficulty: "medium",
} as const satisfies TemperDungeon
