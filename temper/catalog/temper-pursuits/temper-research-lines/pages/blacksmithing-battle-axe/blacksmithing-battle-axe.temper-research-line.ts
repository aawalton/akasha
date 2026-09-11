import type { TemperResearchLine } from "akasha/temper/catalog/temper-pursuits/temper-research-lines/temper-research-line.page-type.types.ts"

export const blacksmithingBattleAxe = {
  id: "01a0616b-2ce0-7003-aea6-f930a51dff09",
  type: "temper-research-line",
  slug: "blacksmithing-battle-axe",
  title: "Battle Axe",
  displayOrder: 4,
  parent: "blacksmithing",
  traits: "jsonl",
} as const satisfies TemperResearchLine
