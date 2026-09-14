import type { TestFixture } from "akasha/testing-system/test-fixtures/test-fixture.page-type.types.ts"

export const loreLibrarySparseTestUtils = {
  id: "01a08ee1-1c98-7da2-b6af-8e53c812c8c5",
  type: "test-fixture",
  slug: "lore-library-sparse-test-utils",
  definition: "a sparse lore library capture a test makes from the real table",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A capture asked to be short is short by the first book of the first collection.",
    },
  ],
} as const satisfies TestFixture
