import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const masterCraftTraceReading = {
  id: "01a06864-aa2b-7003-afed-089f9baeaad7",
  type: "module",
  slug: "master-craft-trace-reading",
  definition: "the traces the inventory addon records for each master writ it tries to craft",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every trace names the outcome that ended that trace.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The traces are read as a list.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run that crafted nothing answers empty rather than absent.",
    },
  ],
} as const satisfies Module
