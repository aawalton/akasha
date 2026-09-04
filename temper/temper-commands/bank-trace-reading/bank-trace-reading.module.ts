import type { Module } from "@akasha/code-system/module"

export const bankTraceReading = {
  id: "01a06864-aa2b-7002-9f57-fb06fdfa105a",
  pageTypeSlug: "module",
  slug: "bank-trace-reading",
  definition: "the timing trace the inventory addon records over a visit to a banker",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The trace is ruled on whole, so an unknown field refuses the read.",
    },
    {
      invariantKind: "departure",
      statement: "A phase the addon did not reach is absent rather than zero.",
    },
  ],
} as const satisfies Module
