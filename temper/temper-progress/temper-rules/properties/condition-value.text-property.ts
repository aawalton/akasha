import type { TextProperty } from "@akasha/pages/text-property"

export type ConditionValue = string

export const conditionValue = {
  id: "01a05fd0-3aa5-7e12-bb0a-a40ab13f2405",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "condition-value",
  propertySlug: "condition-value",
  definition: "what one condition of a rule tests against",
  maxLength: 200,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "stopgap",
      statement: "A number or a list is written here as text whatever kind the test wants.",
    },
  ],
} as const satisfies TextProperty
