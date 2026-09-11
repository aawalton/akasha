import type { TemperResearchLine } from "akasha/temper/catalog/temper-pursuits/temper-research-lines/temper-research-line.page-type.types.ts"

export const blacksmithingCuirass = {
  id: "01a0616b-2ce0-7007-b25a-243b4d2c7144",
  pageTypeSlug: "temper-research-line",
  type: "temper-research-line",
  slug: "blacksmithing-cuirass",
  title: "Cuirass",
  displayOrder: 8,
  parent: "blacksmithing",
  traits: "jsonl",
} as const satisfies TemperResearchLine
