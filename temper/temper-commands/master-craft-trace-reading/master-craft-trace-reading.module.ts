import type { Module } from "@akasha/code-system/module"

export const masterCraftTraceReading = {
  id: "01a06864-aa2b-7003-afed-089f9baeaad7",
  pageTypeSlug: "module",
  slug: "master-craft-trace-reading",
  definition: "the traces the inventory addon records for each master writ it tries to craft",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every trace names the outcome that ended it.",
    },
    {
      invariantKind: "departure",
      statement:
        "The traces are read as a list, so a run that crafted nothing answers empty rather than absent.",
    },
  ],
} as const satisfies Module
