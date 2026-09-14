import type { TestFixture } from "akasha/testing-system/test-fixtures/test-fixture.page-type.types.ts"

export const checkContainerFixtures = {
  id: "01a06137-f963-75d4-b14c-bdaa8c6693a8",
  type: "test-fixture",
  slug: "check-container-fixtures",
  definition: "the stub environment the container condition tests are built from",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every stub environment lookup answers unknown until a test overrides the lookup.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A test context is built by spreading overrides over the stub environment.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "The stub context has no claim map and no stock groups.",
    },
  ],
} as const satisfies TestFixture
