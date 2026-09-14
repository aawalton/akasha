import type { TestFixture } from "akasha/testing-system/test-fixtures/test-fixture.page-type.types.ts"

export const waiting = {
  id: "01a04ef8-da76-7b5c-a410-29aa2cf260ff",
  type: "test-fixture",
  slug: "waiting",
  definition: "a test holding on until something running elsewhere has become true",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The condition waited for is asked again rather than told.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Time running out is said as false rather than thrown.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The condition waited for is asked once more after time is up.",
    },
  ],
} as const satisfies TestFixture
