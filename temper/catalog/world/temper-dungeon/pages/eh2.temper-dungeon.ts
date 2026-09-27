import type { TemperDungeon } from "akasha/temper/catalog/world/temper-dungeon/temper-dungeon.page-type.types.ts"

export const eh2 = {
  id: "01a05fc5-7426-7a88-a912-f74beadfdfa7",
  type: "page-type/temper-dungeon",
  slug: "eh2",
  title: "Elden Hollow II",
  key: "EH2",
  questGiver: "temper-quest-giver/maj-al-ragath",
  rotationPosition: 10,
  soloDifficulty: "medium",
  esoZoneId: 931,
  zoneKey: "AD2",
  questId: 4675,
  displayOrder: 4,
} as const satisfies TemperDungeon
