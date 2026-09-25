import type { OneOfProperty } from "akasha/page/one-of-property/one-of-property.page-type.types.ts"

export const appliedDebuffs = {
  id: "01a0d893-0d21-7527-b312-94ab6d00c5ad",
  type: "page-type/one-of-property",
  slug: "applied-debuffs",
  propertySlug: "applied-debuffs",
  definition: "the debuffs a scribed skill carrying this script puts on its target",
  members: ["relation-property/major-debuff", "relation-property/minor-debuff"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A grimoire's affix row names the grade that grimoire's own description gives.",
    },
  ],
  types: "ts",
} as const satisfies OneOfProperty
