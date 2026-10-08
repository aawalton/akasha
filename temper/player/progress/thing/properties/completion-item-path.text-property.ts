import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const completionItemPath = {
  id: "01a05fc6-81fb-729c-8013-4df821b1c2d7",
  type: "page-type/text-property",
  slug: "completion-item-path",
  propertySlug: "completion-item-path",
  definition: "a step of the way down a completion card to the item counted",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A path is read in the order the page states each step.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-02T01:40:40.059Z",
  updatedAt: "2026-09-22T10:19:25.000Z",
} as const satisfies TextProperty
