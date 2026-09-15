import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const addonMenuUtil = {
  id: "01a06100-0000-7000-8000-000000000012",
  type: "page-type/module",
  slug: "addon-menu-util",
  definition: "the widget scaffolding and bookkeeping the library publishes as LAM.util",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Half-width controls place the label above the container instead of beside the container.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A help URL becomes a clickable FAQ icon anchored beside the label.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Controls flagged as requiring reload record their value at creation time.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The published util table is filled in at the bottom of the module.",
    },
  ],
} as const satisfies Module
