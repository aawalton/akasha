import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ruleMatcherContextEquipment = {
  id: "01a06281-4830-72a3-92f6-7ca21fa87284",
  type: "page-type/module",
  slug: "rule-matcher-context-equipment",
  definition: "the gear every target build wants, decoded from the build hashes",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A character whose equipment toggle is off wants no gear.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A toggle set on the one beats the toggle set for everyone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A target build nothing holds wants no gear.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build wanting no trait in a slot wants no gear for that slot.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build hash that does not decode yields no wanted gear.",
    },
  ],
} as const satisfies Module
