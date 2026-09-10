import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const inventoryRuleTestUtils = {
  id: "01a06100-3bef-7eeb-afe9-e4458d43d5ef",
  pageTypeSlug: "module",
  slug: "inventory-rule-test-utils",
  definition: "the item and the matcher context a test builds when the test cares about neither",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A field the test leaves unnamed takes the value stated here.",
    },
  ],
} as const satisfies Module
