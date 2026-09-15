import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const specializedItemTypeConstants = {
  id: "01a06127-664a-72e6-abad-75f1cbed0e4c",
  type: "page-type/module",
  slug: "specialized-item-type-constants",
  definition:
    "the specialized item type numbers the game client has, each under the client's own name",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each number is read out of the client rather than written down here.",
    },
  ],
} as const satisfies Module
