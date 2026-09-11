import type { TemperResearchLine } from "akasha/temper/catalog/temper-pursuits/temper-research-lines/temper-research-line.page-type.types.ts"

export const jewelryCraftingNecklace = {
  id: "01a0616b-2ce1-7011-a0d5-eb01ff722779",
  pageTypeSlug: "temper-research-line",
  type: "temper-research-line",
  slug: "jewelry-crafting-necklace",
  title: "Necklace",
  displayOrder: 2,
  parent: "jewelry-crafting",
  traits: "jsonl",
} as const satisfies TemperResearchLine
