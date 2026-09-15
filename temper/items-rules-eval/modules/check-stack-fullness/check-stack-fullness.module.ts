import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const checkStackFullness = {
  id: "01a06137-f969-733b-bff3-0c5160949134",
  type: "module",
  slug: "check-stack-fullness",
  definition:
    "the condition check over an item's stack count against the item's maximum stack size",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A stack at or above the maximum stack size counts as full.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An absent stack count or maximum stack size makes the condition indeterminate.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The rule chooses between the full form and the partial form of the condition.",
    },
  ],
} as const satisfies Module
