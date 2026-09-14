import type { TestFixture } from "akasha/testing-system/test-fixtures/test-fixture.page-type.types.ts"

export const inventoryManagementPlanTestUtils = {
  id: "01a0615a-a1dc-7882-8483-be86859114a7",
  type: "test-fixture",
  slug: "inventory-management-plan-test-utils",
  definition: "the items, holdings and rules a plan test builds when the test cares about neither",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A field the test leaves unnamed takes the value stated here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each item this makes carries an id no other item it made carries.",
    },
  ],
} as const satisfies TestFixture
