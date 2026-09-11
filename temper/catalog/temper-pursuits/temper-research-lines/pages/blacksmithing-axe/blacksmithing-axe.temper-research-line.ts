import type { TemperResearchLine } from "akasha/temper/catalog/temper-pursuits/temper-research-lines/temper-research-line.page-type.types.ts"

export const blacksmithingAxe = {
  id: "01a0616b-2ce0-7000-b957-13b5ed1d061f",
  type: "temper-research-line",
  slug: "blacksmithing-axe",
  title: "Axe",
  displayOrder: 1,
  parent: "blacksmithing",
  traits: "jsonl",
} as const satisfies TemperResearchLine
