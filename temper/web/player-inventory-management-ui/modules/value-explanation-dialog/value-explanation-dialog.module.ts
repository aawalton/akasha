import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const valueExplanationDialog = {
  id: "01a0636c-5da1-7111-9485-6b20a0ac006e",
  type: "page-type/module",
  slug: "value-explanation-dialog",
  definition: "the dialog saying how an item's value was worked out",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every heading, row label and basis sentence is read from a web phrase page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Gold amounts are worded by the gold amount module.",
    },
  ],
} as const satisfies Module
