import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const useRuleCard = {
  id: "01a0636c-5da1-73ac-82cb-033685f0006c",
  type: "page-type/module",
  slug: "use-rule-card",
  definition: "the rule a rule card is editing",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The trait and set source options are read again whenever their catalogue is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Chosen locations are named from the location type and bag pages, read again as they change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A filter offered is named by its condition field's page, and none is offered before.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule over every category is named by the item category tree's all page.",
    },
  ],
  createdAt: "2026-09-02T18:40:41.377Z",
  updatedAt: "2026-09-27T11:56:54.000Z",
} as const satisfies Module
