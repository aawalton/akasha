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
      statement: "A grimoire's affix row names the grade that grimoire's own description gives.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A debuff here is a minor one, as an effect's debuff is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row whose description gives a major debuff names no debuff.",
    },
  ],
  types: "ts",
} as const satisfies MultiRelationProperty
