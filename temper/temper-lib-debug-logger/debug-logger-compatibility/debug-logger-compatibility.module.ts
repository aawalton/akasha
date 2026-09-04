import type { Module } from "@akasha/code-system/module"

export const debugLoggerCompatibility = {
  id: "01a06061-408d-7ca3-a675-c45961d9bbc9",
  pageTypeSlug: "module",
  slug: "debug-logger-compatibility",
  definition: "the names an older release of the library answered to",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The library answers to an older name as well as to the current name.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing here is reached by code written against the current names.",
    },
  ],
} as const satisfies Module
