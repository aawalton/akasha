import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const advancedSheetRow = {
  id: "01a159f9-4e81-7dec-a0f0-9736011f48c3",
  type: "page-type/text-property",
  slug: "advanced-sheet-row",
  propertySlug: "advanced-sheet-row",
  definition: "the row of the game's Advanced Stats sheet whose flat part is a stat",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A row is named as a reading keeps it in the sheet it captured.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stat naming a row is pinned from that row's flat part.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-20T15:41:13.215Z",
  updatedAt: "2026-10-20T15:41:13.215Z",
} as const satisfies TextProperty
