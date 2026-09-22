import type { TestFixture } from "akasha/check/test/fixture/test-fixture.page-type.types.ts"

export const inventoryManagementPlanChainPropertyFixtures = {
  id: "01a06289-2676-7bb0-bf20-a5161d4bbd69",
  type: "page-type/test-fixture",
  slug: "inventory-management-plan-chain-property-fixtures",
  definition: "the generated destination chains for the plan's chain property tests",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A generated chain has at least a tail tier.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A bounded chain has a target quantity on every tier.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chain scenario has an equivalent written as one rule per tier.",
    },
  ],
} as const satisfies TestFixture
