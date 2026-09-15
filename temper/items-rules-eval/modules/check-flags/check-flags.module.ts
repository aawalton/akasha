import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const checkFlags = {
  id: "01a06137-f965-79e3-938a-957ed9482203",
  type: "module",
  slug: "check-flags",
  definition: "the condition check over the eight boolean flags an item has",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every flag condition has a positive form and a negated form.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A flag absent from the item facts makes the condition indeterminate rather than false.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The first flag that fails ends the flag check.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No flag condition consults the evaluation environment.",
    },
  ],
} as const satisfies Module
