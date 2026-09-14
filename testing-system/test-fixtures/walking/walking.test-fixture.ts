import type { TestFixture } from "akasha/testing-system/test-fixtures/test-fixture.page-type.types.ts"

export const walking = {
  id: "01a04ef8-da76-76ad-9345-28b37bd75cdd",
  type: "test-fixture",
  slug: "walking",
  definition: "everything under a folder, read back as one sorted list a test can compare",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path is said from the folder walked rather than from the root.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A body is read as text.",
    },
  ],
} as const satisfies TestFixture
