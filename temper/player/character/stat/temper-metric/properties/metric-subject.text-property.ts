import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const metricSubject = {
  id: "01a0deff-4b82-7de4-b631-ce2c6f6ec760",
  type: "page-type/text-property",
  slug: "metric-subject",
  propertySlug: "subject",
  definition: "who a stat measures, a character or a companion",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A stat stating no subject measures a character.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
