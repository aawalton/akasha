import type { Module } from "@akasha/code/module"

export const masterCraftTraceReading = {
  id: "01a06864-aa2b-7003-afed-089f9baeaad7",
  pageTypeSlug: "module",
  slug: "master-craft-trace-reading",
  definition: "the traces the inventory addon records for each master writ it tries to craft",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every trace names the outcome that ended that trace.",
    },
    {
      invariantKind: "departure",
      statement: "The traces are read as a list.",
    },
    {
      invariantKind: "departure",
      statement: "A run that crafted nothing answers empty rather than absent.",
    },
  ],
} as const satisfies Module
