import type { TemperResearchLine } from "akasha/temper/catalog/temper-pursuits/temper-research-lines/temper-research-line.page-type.types.ts"

export const clothingGloves = {
  id: "01a0616b-2ce0-7011-a9db-437f60ed8e50",
  pageTypeSlug: "temper-research-line",
  type: "temper-research-line",
  slug: "clothing-gloves",
  title: "Gloves",
  displayOrder: 3,
  parent: "clothing",
  traits: "jsonl",
} as const satisfies TemperResearchLine
