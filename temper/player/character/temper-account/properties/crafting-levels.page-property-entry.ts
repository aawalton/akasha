import type { PagePropertyEntry } from "akasha/page/property-entry/page-property-entry.page-type.types.ts"

export const craftingLevels = {
  id: "01a0675a-f185-75b8-8e9b-97a031246492",
  type: "page-type/page-property-entry",
  slug: "crafting-levels",
  propertySlug: "crafting-levels",
  definition: "how far each character has come in each craft, one craft to a line",
  properties: [
    { pageProperty: "text-property/eso-character-id", required: true, many: false },
    { pageProperty: "number-property/craft-type-id", required: true, many: false },
    { pageProperty: "number-property/crafting-level", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One line is one craft of one character.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A craft a character has not opened still has a line.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T13:00:08.453Z",
  updatedAt: "2026-09-21T15:29:06.000Z",
} as const satisfies PagePropertyEntry
