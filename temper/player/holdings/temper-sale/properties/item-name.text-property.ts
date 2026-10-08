import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const itemName = {
  id: "01a06553-ace7-70af-be45-b007740978fa",
  type: "page-type/text-property",
  slug: "item-name",
  propertySlug: "name",
  definition: "what a sweep read an item's name as",
  maxLength: 200,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A name is the text one sweep read where a title is the item's name now.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name and a title part where a sweep read the item before the item was renamed.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T03:32:57.703Z",
  updatedAt: "2026-09-21T15:34:59.000Z",
} as const satisfies TextProperty
