import type { TemperResearchLine } from "akasha/temper/catalog/temper-pursuits/temper-research-lines/temper-research-line.page-type.types.ts"

export const woodworkingShield = {
  id: "01a0616b-2ce1-700e-a152-853421cd2318",
  pageTypeSlug: "temper-research-line",
  type: "temper-research-line",
  slug: "woodworking-shield",
  title: "Shield",
  displayOrder: 6,
  parent: "woodworking",
  traits: "jsonl",
} as const satisfies TemperResearchLine
