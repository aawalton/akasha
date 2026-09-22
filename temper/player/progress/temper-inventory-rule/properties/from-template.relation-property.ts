import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const fromTemplate = {
  id: "01a07283-f295-75b5-b96e-68b5ca4e2ea7",
  type: "page-type/relation-property",
  slug: "from-template",
  propertySlug: "from-template",
  definition: "the template of a rule in force",
  targetPageType: "page-type/temper-rule-template",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule a player wrote from nothing names no template.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
