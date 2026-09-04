import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const ruleMatcherContextEquipment = {
  id: "01a06281-4830-72a3-92f6-7ca21fa87284",
  pageTypeSlug: "module",
  slug: "rule-matcher-context-equipment",
  definition: "the gear every target build wants, decoded from the build hashes",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A character whose equipment toggle is off wants no gear.",
    },
    {
      invariantKind: "departure",
      statement: "A build hash that does not decode yields no wanted gear.",
    },
  ],
} as const satisfies Module
