import type { PagePropertyEntry } from "@akasha/pages-system/page-property-entry"

export type CraftingLevels = "jsonl"

export const craftingLevels = {
  id: "01a0675a-f185-75b8-8e9b-97a031246492",
  pageTypeSlug: "page-property-entry",
  slug: "crafting-levels",
  propertySlug: "crafting-levels",
  definition: "how far each character has come in each craft, one craft to a line",
  properties: [
    { pagePropertySlug: "eso-character-id", required: true, many: false },
    { pagePropertySlug: "craft-type-id", required: true, many: false },
    { pagePropertySlug: "crafting-level", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "One line is one craft of one character.",
    },
    {
      invariantKind: "departure",
      statement: "A craft a character has not opened still has a line.",
    },
  ],
} as const satisfies PagePropertyEntry
