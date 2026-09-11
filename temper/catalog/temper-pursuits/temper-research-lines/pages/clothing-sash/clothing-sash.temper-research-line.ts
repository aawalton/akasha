import type { TemperResearchLine } from "akasha/temper/catalog/temper-pursuits/temper-research-lines/temper-research-line.page-type.types.ts"

export const clothingSash = {
  id: "01a0616b-2ce1-7000-ab6f-1785dc306baa",
  type: "temper-research-line",
  slug: "clothing-sash",
  title: "Sash",
  displayOrder: 7,
  parent: "clothing",
  traits: "jsonl",
} as const satisfies TemperResearchLine
