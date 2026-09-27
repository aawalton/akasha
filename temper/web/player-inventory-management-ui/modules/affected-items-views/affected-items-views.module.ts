import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const affectedItemsViews = {
  id: "01a0636c-5d96-799f-a4a3-b169e3670004",
  type: "page-type/module",
  slug: "affected-items-views",
  definition: "the ways a reader looks over the items a rule would affect",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Companion trait names are drawn again whenever the companion catalogue is read again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The By Location tree is named from the location type and bag pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tab names and the empty note are web phrase pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Gold amounts are worded by the gold amount module.",
    },
  ],
} as const satisfies Module
