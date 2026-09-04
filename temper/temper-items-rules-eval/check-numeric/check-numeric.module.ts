import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const checkNumeric = {
  id: "01a06137-f967-7ff4-a7da-b8e750de7c13",
  pageTypeSlug: "module",
  slug: "check-numeric",
  definition: "the condition check over an item's quality, level, and three value figures",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Required champion points above zero raise the level to 50 plus a tenth of the points.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every numeric comparison defaults to the <= operator when the rule names no operator.",
    },
    {
      invariantKind: "departure",
      statement: "maxValue and minValue are consulted only when the rule sets no marketValue.",
    },
    {
      invariantKind: "departure",
      statement:
        "An item carrying no value signal satisfies a zero threshold under <= and nothing higher.",
    },
  ],
} as const satisfies Module
