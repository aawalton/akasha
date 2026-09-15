import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuUtilHiddenContext = {
  id: "01a06275-c449-7aad-8c3a-da995ae989c7",
  type: "page-type/module",
  slug: "scrollable-menu-util-hidden-context",
  definition: "the part of the mouse-up decision that runs while a context menu is open",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The context-menu arm of the hide decision sits in its own module for length.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every value the arm reads is handed in rather than reached from the caller.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The arm answers whether the open menu should hide.",
    },
  ],
} as const satisfies Module
