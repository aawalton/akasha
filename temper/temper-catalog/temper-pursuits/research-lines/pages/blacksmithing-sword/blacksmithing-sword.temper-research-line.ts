import type { TemperResearchLine } from "../../temper-research-line.page-type.ts"

export const blacksmithingSword = {
  id: "01a0616b-2ce0-7002-ad55-6ff9fafd7c7b",
  pageTypeSlug: "temper-research-line",
  slug: "blacksmithing-sword",
  title: "Sword",
  displayOrder: 3,
  parent: "blacksmithing",
  traits: "jsonl",
} as const satisfies TemperResearchLine
