import type { TemperDungeon } from "akasha/temper/catalog/world/temper-dungeon/temper-dungeon.page-type.types.ts"

export const eh1 = {
  id: "01a05fc5-7425-7aaa-9002-acff9466856c",
  type: "page-type/temper-dungeon",
  slug: "eh1",
  title: "Elden Hollow I",
  key: "EH1",
  questGiver: "temper-quest-giver/maj-al-ragath",
  rotationPosition: 5,
  soloDifficulty: "easy",
  esoZoneId: 126,
  zoneKey: "AD2",
  questId: 4336,
  displayOrder: 3,
} as const satisfies TemperDungeon
