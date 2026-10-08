import type { TestFixture } from "akasha/check/test/fixture/test-fixture.page-type.types.ts"

export const inventoryManagementPlanPropertyFixtures = {
  id: "01a06289-2676-74b4-91ec-0643ccf4bba1",
  type: "page-type/test-fixture",
  slug: "inventory-management-plan-property-fixtures",
  definition: "the generated holdings and rules the plan's property tests use",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A scenario puts every affected item on the same character's backpack.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A capacity scenario fills the bank to a stated number of free slots.",
    },
  ],
  createdAt: "2026-09-02T14:32:30.582Z",
  updatedAt: "2026-09-22T13:48:32.000Z",
} as const satisfies TestFixture
