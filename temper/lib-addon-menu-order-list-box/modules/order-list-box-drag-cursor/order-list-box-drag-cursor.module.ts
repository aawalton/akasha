import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const orderListBoxDragCursor = {
  id: "01a06207-bdf1-7c7e-8938-7ce03c0df707",
  type: "module",
  slug: "order-list-box-drag-cursor",
  definition: "the floating label following the pointer and the handlers a drag switches on",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The dragged row is shown as a label anchored to the pointer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A drag ending anywhere off the list puts the row back.",
    },
  ],
} as const satisfies Module
