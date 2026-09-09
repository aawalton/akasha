import type { RelationProperty } from "@akasha/pages/relation-property"

export type FromTemplate = string

export const fromTemplate = {
  id: "01a07283-f295-75b5-b96e-68b5ca4e2ea7",
  pageTypeSlug: "relation-property",
  slug: "from-template",
  propertySlug: "from-template",
  definition: "the template a rule in force was adopted from",
  targetPageType: "page-type/temper-rule-template",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rule a player wrote from nothing names no template.",
    },
  ],
} as const satisfies RelationProperty
