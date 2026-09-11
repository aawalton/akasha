import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const resourceLoaderArgsTestUtils = {
  id: "01a08ee4-41a2-7873-81b7-b181807acb88",
  type: "module",
  slug: "resource-loader-args-test-utils",
  definition: "the arguments a test hands a resource route's loader for one path",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The path is read against the site the browser would have asked.",
    },
  ],
} as const satisfies Module
