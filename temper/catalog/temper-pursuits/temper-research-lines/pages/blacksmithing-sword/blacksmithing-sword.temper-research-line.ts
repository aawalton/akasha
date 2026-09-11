import type { TemperResearchLine } from "akasha/temper/catalog/temper-pursuits/temper-research-lines/temper-research-line.page-type.types.ts"

export const blacksmithingSword = {
  id: "01a0616b-2ce0-7002-ad55-6ff9fafd7c7b",
  type: "temper-research-line",
  slug: "blacksmithing-sword",
  title: "Sword",
  displayOrder: 3,
  parent: "blacksmithing",
  traits: "jsonl",
} as const satisfies TemperResearchLine
