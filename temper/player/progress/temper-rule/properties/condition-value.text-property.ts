import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const conditionValue = {
  id: "01a05fd0-3aa5-7e12-bb0a-a40ab13f2405",
  type: "page-type/text-property",
  slug: "condition-value",
  propertySlug: "condition-value",
  definition: "what a condition of a rule tests against",
  maxLength: 200,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/stopgap",
      statement: "A number or a list is written here as text whatever kind the test wants.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
