import type { TestFixture } from "akasha/check/test/fixture/test-fixture.page-type.types.ts"

export const loreLibrarySparseTestUtils = {
  id: "01a08ee1-1c98-7da2-b6af-8e53c812c8c5",
  type: "page-type/test-fixture",
  slug: "lore-library-sparse-test-utils",
  definition: "a sparse lore library capture a test makes from the lore library held",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A capture asked to be short is short by the first book of the first collection.",
    },
  ],
  createdAt: "2026-09-11T05:11:52.728Z",
  updatedAt: "2026-09-27T10:46:43.000Z",
} as const satisfies TestFixture
