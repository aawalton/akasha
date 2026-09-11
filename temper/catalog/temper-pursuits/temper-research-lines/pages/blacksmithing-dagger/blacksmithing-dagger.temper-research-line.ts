import type { TemperResearchLine } from "akasha/temper/catalog/temper-pursuits/temper-research-lines/temper-research-line.page-type.types.ts"

export const blacksmithingDagger = {
  id: "01a0616b-2ce0-7006-90b3-aa319fcca252",
  type: "temper-research-line",
  slug: "blacksmithing-dagger",
  title: "Dagger",
  displayOrder: 7,
  parent: "blacksmithing",
  traits: "jsonl",
} as const satisfies TemperResearchLine
