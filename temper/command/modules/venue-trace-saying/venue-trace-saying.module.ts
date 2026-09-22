import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const venueTraceSaying = {
  id: "01a09b2e-baec-7b08-bcf7-07f61d70d416",
  type: "page-type/module",
  slug: "venue-trace-saying",
  definition: "the lines a visit's timing trace is told in, whatever venue the visit was to",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A bracket is told as its count, its total and its longest turn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A bucket the trace does not carry is told as nil naming the version that fills it.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a file.",
    },
  ],
} as const satisfies Module
