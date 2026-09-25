import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const appliedDebuffs = {
  id: "01a0d893-0d21-7527-b312-94ab6d00c5ad",
  type: "page-type/multi-relation-property",
  slug: "applied-debuffs",
  propertySlug: "applied-debuffs",
  definition: "the debuffs a scribed skill carrying this script puts on its target",
  targetPageType: "page-type/temper-debuff-minor",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A script whose debuff is a different grade on different grimoires names no debuff.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A debuff here is a minor one, as an effect's debuff is.",
    },
  ],
  types: "ts",
} as const satisfies MultiRelationProperty
