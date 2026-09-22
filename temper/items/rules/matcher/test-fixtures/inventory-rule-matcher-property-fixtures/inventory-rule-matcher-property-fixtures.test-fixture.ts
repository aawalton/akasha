import type { TestFixture } from "akasha/check/test/fixture/test-fixture.page-type.types.ts"

export const inventoryRuleMatcherPropertyFixtures = {
  id: "01a06281-4830-72b8-a8a5-7323d4ed93c2",
  type: "page-type/test-fixture",
  slug: "inventory-rule-matcher-property-fixtures",
  definition: "the generated rules and items building the matcher's property tests",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A generated list of rules has no two rules of one id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item rule is answered before any category rule.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An item no rule claims falls to the implicit terminal rule.",
    },
  ],
} as const satisfies TestFixture
