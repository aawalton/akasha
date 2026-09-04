import type { Module } from "@akasha/code-system/module"

export const orderListBoxPublish = {
  id: "01a06207-bdf7-7fea-98e8-fdbf3c5d25c0",
  pageTypeSlug: "module",
  slug: "order-list-box-publish",
  definition: "the widget handed to LibAddonMenu-2.0 once the game says this addon loaded",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The widget is offered only after the game reports this addon loaded.",
    },
    {
      invariantKind: "departure",
      statement: "A widget LibAddonMenu-2.0 already holds at a higher version is left alone.",
    },
  ],
} as const satisfies Module
