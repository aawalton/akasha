import type { Module } from "@akasha/code-system/module"

export const orderListBoxDragMethods = {
  id: "01a06207-bdf2-7f90-8605-c3a58dfd8856",
  pageTypeSlug: "module",
  slug: "order-list-box-drag-methods",
  definition: "the methods a row's drag runs from mouse down through to mouse up",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A drag past the top or the foot of the list scrolls the list.",
    },
    {
      invariantKind: "departure",
      statement: "A mouse up outside the list aborts the drag rather than dropping.",
    },
  ],
} as const satisfies Module
