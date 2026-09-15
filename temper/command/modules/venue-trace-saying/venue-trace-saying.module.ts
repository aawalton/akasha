import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const venueTraceSaying = {
  id: "01a09b2e-baec-7b08-bcf7-07f61d70d416",
  type: "module",
  slug: "venue-trace-saying",
  definition: "the lines one visit's timing trace is told in, whatever venue the visit was to",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A bracket is told as its count, its total and its longest turn.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A bucket the trace does not carry is told as nil naming the version that fills it.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a file.",
    },
  ],
} as const satisfies Module
