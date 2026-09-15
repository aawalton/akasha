import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const orderListBoxPublish = {
  id: "01a06207-bdf7-7fea-98e8-fdbf3c5d25c0",
  type: "module",
  slug: "order-list-box-publish",
  definition: "the widget handed to LibAddonMenu-2.0 once the game says this addon loaded",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The widget is offered only after the game reports this addon loaded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A widget LibAddonMenu-2.0 already has at a higher version is left alone.",
    },
  ],
} as const satisfies Module
