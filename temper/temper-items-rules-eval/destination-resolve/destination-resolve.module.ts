import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const destinationResolve = {
  id: "01a06137-f96b-7043-97c6-458a3d722f28",
  pageTypeSlug: "module",
  slug: "destination-resolve",
  definition: "the concrete destination a by-priority rule destination resolves to for one item",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A destination that is not a by-priority token resolves to the token unchanged.",
    },
    {
      invariantKind: "gap",
      statement:
        "The by-priority companion destination has no resolver and always answers indeterminate.",
    },
    {
      invariantKind: "departure",
      statement:
        "Any lookup answering unknown makes the whole destination resolution indeterminate.",
    },
    {
      invariantKind: "departure",
      statement: "A character already claiming the same item key is skipped during use resolution.",
    },
  ],
} as const satisfies Module
