import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const orderListBoxWidget = {
  id: "01a06207-bdf9-7fdb-a11c-b38837f874d1",
  type: "module",
  slug: "order-list-box-widget",
  definition: "the panel row LibAddonMenu-2.0 builds when an addon asks for an order list box",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The widget is built from the same data shape every LAM-2.0 widget takes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A panel closing turns off the drag handlers the widget left on.",
    },
  ],
} as const satisfies Module
