import type { TestFixture } from "akasha/check/test/fixture/test-fixture.page-type.types.ts"

export const compileRules = {
  id: "01a06151-370b-7db1-8ce0-836dab4a6093",
  type: "page-type/test-fixture",
  slug: "compile-rules",
  definition: "a whole list of saved rules compiled at once for a property test",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each rule compiles on its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The order the rules were given is kept.",
    },
  ],
  createdAt: "2026-09-02T08:51:47.595Z",
  updatedAt: "2026-09-21T15:36:01.000Z",
} as const satisfies TestFixture
