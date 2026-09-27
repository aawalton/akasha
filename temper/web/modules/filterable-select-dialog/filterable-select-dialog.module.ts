import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const filterableSelectDialog = {
  id: "01a06429-76ff-7cfe-921e-d7a3ba65678e",
  type: "page-type/module",
  slug: "filterable-select-dialog",
  definition: "a dialog choosing an item out of a searched, badge-filtered, grouped list",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The effect names are worked out again whenever the stats or skill catalogue are read again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Its wording is read from web phrase pages.",
    },
  ],
} as const satisfies Module
