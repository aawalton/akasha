import type { TestFixture } from "akasha/testing-system/test-fixtures/test-fixture.page-type.types.ts"

export const compileRules = {
  id: "01a06151-370b-7db1-8ce0-836dab4a6093",
  type: "test-fixture",
  slug: "compile-rules",
  definition: "a whole list of saved rules compiled at once for a property test",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each rule compiles on its own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The order the rules were given is kept.",
    },
  ],
} as const satisfies TestFixture
