import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const checkStackFullness = {
  id: "01a06137-f969-733b-bff3-0c5160949134",
  pageTypeSlug: "module",
  slug: "check-stack-fullness",
  definition:
    "the condition check over an item's stack count against the item's maximum stack size",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A stack at or above the maximum stack size counts as full.",
    },
    {
      invariantKind: "departure",
      statement: "An absent stack count or maximum stack size makes the condition indeterminate.",
    },
    {
      invariantKind: "departure",
      statement: "The rule chooses between the full form and the partial form of the condition.",
    },
  ],
} as const satisfies Module
