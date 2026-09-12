import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const destinationResolve = {
  id: "01a06137-f96b-7043-97c6-458a3d722f28",
  type: "module",
  slug: "destination-resolve",
  definition: "the concrete destination a by-priority rule destination resolves to for one item",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A destination that is not a by-priority token resolves to the token unchanged.",
    },
    {
      invariantKind: "departure",
      statement: "A stock rule carrying a chain resolves to the surplus tier's destination.",
    },
    {
      invariantKind: "departure",
      statement: "A stock chain is planned by the one planner the game side plans it by.",
    },
    {
      invariantKind: "departure",
      statement: "A resolved stock chain carries the fill tier's target quantity beside it.",
    },
    {
      invariantKind: "departure",
      statement: "A fill tier no character in priority order passes has a target quantity of zero.",
    },
    {
      invariantKind: "departure",
      statement: "A chain naming no by-priority tier leaves the flat destination to answer.",
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
