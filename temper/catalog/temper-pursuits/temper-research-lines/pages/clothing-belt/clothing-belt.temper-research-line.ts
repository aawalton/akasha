import type { TemperResearchLine } from "akasha/temper/catalog/temper-pursuits/temper-research-lines/temper-research-line.page-type.types.ts"

export const clothingBelt = {
  id: "01a0616b-2ce1-7007-a7f9-3512ad5975dd",
  pageTypeSlug: "temper-research-line",
  type: "temper-research-line",
  slug: "clothing-belt",
  title: "Belt",
  displayOrder: 14,
  parent: "clothing",
  traits: "jsonl",
} as const satisfies TemperResearchLine
