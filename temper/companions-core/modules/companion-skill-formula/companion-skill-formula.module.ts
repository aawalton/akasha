import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionSkillFormula = {
  id: "01a06152-c2d2-712b-b06f-fc0f0495ce2e",
  type: "page-type/module",
  slug: "companion-skill-formula",
  definition: "the number a companion skill's value formula works out to against a set of stats",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A percentage with no effect type is worked out through a lossy truncation helper.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Soothing healing done is floored rather than rounded.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Equipment sources are left out of the non-soothing healing done list.",
    },
  ],
} as const satisfies Module
