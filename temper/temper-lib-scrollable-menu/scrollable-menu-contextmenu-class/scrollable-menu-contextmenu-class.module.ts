import type { Module } from "@akasha/code-system/module"

export const scrollableMenuContextmenuClass = {
  id: "01a06275-c447-7d40-8e68-2f92eea8b96d",
  pageTypeSlug: "module",
  slug: "scrollable-menu-contextmenu-class",
  definition: "the single context-menu object and the way it opens at the mouse",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One context-menu object is created at addon load and never replaced.",
    },
    {
      invariantKind: "departure",
      statement: "Entries are appended to a plain list rather than added through the combobox.",
    },
    {
      invariantKind: "departure",
      statement: "The menu anchors to the mouse position rather than to a container control.",
    },
    {
      invariantKind: "departure",
      statement: "Opening while another library menu is visible arms two preventer variables.",
    },
  ],
} as const satisfies Module
