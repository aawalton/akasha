import type { Module } from "@akasha/code-system/module"

export const scrollableMenuUtilHidden = {
  id: "01a06275-c449-7fae-9235-4c18d5baf2e1",
  pageTypeSlug: "module",
  slug: "scrollable-menu-util-hidden",
  definition: "the decision on whether a mouse click should close the open menu",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The decision branches first on whether a context menu is currently visible.",
    },
    {
      invariantKind: "constraint",
      statement: "A right click on a control outside the context menu closes that menu.",
    },
    {
      invariantKind: "departure",
      statement: "Multi-select and a false closeOnSelect both keep the menu open on a left click.",
    },
    {
      invariantKind: "departure",
      statement: "Verbose tracing sits behind a local flag that is hard-coded to false.",
    },
  ],
} as const satisfies Module
