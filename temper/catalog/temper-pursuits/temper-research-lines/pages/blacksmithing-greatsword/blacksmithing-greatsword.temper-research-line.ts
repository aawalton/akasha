import type { TemperResearchLine } from "akasha/temper/catalog/temper-pursuits/temper-research-lines/temper-research-line.page-type.types.ts"

export const blacksmithingGreatsword = {
  id: "01a0616b-2ce0-7005-9973-6b5ebffd88ae",
  type: "temper-research-line",
  slug: "blacksmithing-greatsword",
  title: "Greatsword",
  displayOrder: 6,
  parent: "blacksmithing",
  traits: "jsonl",
} as const satisfies TemperResearchLine
