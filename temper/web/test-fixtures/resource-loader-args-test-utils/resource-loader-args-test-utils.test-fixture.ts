import type { TestFixture } from "akasha/check/test/fixture/test-fixture.page-type.types.ts"

export const resourceLoaderArgsTestUtils = {
  id: "01a08ee4-41a2-7873-81b7-b181807acb88",
  type: "page-type/test-fixture",
  slug: "resource-loader-args-test-utils",
  definition: "the arguments a test hands a resource route's loader for a path",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The path is read against the site the browser would have asked.",
    },
  ],
  createdAt: "2026-09-11T05:15:18.818Z",
  updatedAt: "2026-09-22T10:19:39.000Z",
} as const satisfies TestFixture
