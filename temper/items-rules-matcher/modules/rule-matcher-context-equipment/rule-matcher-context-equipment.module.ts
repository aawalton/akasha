import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ruleMatcherContextEquipment = {
  id: "01a06281-4830-72a3-92f6-7ca21fa87284",
  type: "module",
  slug: "rule-matcher-context-equipment",
  definition: "the gear every target build wants, decoded from the build hashes",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A character whose equipment toggle is off wants no gear.",
    },
    {
      invariantKind: "departure",
      statement: "A toggle set on the one beats the toggle set for everyone.",
    },
    {
      invariantKind: "departure",
      statement: "A target build nothing holds wants no gear.",
    },
    {
      invariantKind: "departure",
      statement: "A build wanting no trait in a slot wants no gear for that slot.",
    },
    {
      invariantKind: "departure",
      statement: "A build hash that does not decode yields no wanted gear.",
    },
  ],
} as const satisfies Module
