import type { TestFixture } from "akasha/check/test/fixture/test-fixture.page-type.types.ts"

export const checkContainerFixtures = {
  id: "01a06137-f963-75d4-b14c-bdaa8c6693a8",
  type: "page-type/test-fixture",
  slug: "check-container-fixtures",
  definition: "the stub environment building the container condition tests",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every stub environment lookup answers unknown until a test overrides the lookup.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A test context is built by spreading overrides over the stub environment.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The stub context has no claim map and no stock groups.",
    },
  ],
} as const satisfies TestFixture
