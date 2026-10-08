import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const conditionValue = {
  id: "01a05fd0-3aa5-7e12-bb0a-a40ab13f2405",
  type: "page-type/text-property",
  slug: "condition-value",
  propertySlug: "condition-value",
  definition: "the value a rule's condition expects",
  maxLength: 200,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/stopgap",
      statement: "A number or a list is written here as text whatever kind the test wants.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-02T01:51:17.157Z",
  updatedAt: "2026-09-22T14:05:53.000Z",
} as const satisfies TextProperty
