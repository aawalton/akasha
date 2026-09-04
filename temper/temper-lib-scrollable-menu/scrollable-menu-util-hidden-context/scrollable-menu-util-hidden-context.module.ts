import type { Module } from "@akasha/code-system/module"

export const scrollableMenuUtilHiddenContext = {
  id: "01a06275-c449-7aad-8c3a-da995ae989c7",
  pageTypeSlug: "module",
  slug: "scrollable-menu-util-hidden-context",
  definition: "the part of the mouse-up decision that runs while a context menu is open",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The context-menu arm of the hide decision sits in its own module for length.",
    },
    {
      invariantKind: "departure",
      statement: "Every value the arm reads is handed in rather than reached from the caller.",
    },
    {
      invariantKind: "constraint",
      statement: "The arm answers whether the open menu should hide.",
    },
  ],
} as const satisfies Module
