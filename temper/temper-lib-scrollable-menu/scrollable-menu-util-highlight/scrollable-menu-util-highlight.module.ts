import type { Module } from "@akasha/code-system/module"

export const scrollableMenuUtilHighlight = {
  id: "01a06275-c449-7422-aa38-f077e3516352",
  pageTypeSlug: "module",
  slug: "scrollable-menu-util-highlight",
  definition: "the highlight animation applied to a hovered submenu or context-menu row",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The animation control is created once and cached on the row under a field name.",
    },
    {
      invariantKind: "departure",
      statement: "Unhighlighting clears the breadcrumb name from the row.",
    },
    {
      invariantKind: "constraint",
      statement: "The screen's usable dropdown height is the GuiRoot height less one hundred.",
    },
    {
      invariantKind: "departure",
      statement:
        "A row whose highlight template is not a string falls back to the library default.",
    },
  ],
} as const satisfies Module
