import type { Module } from "@akasha/code-system/module"

export const scrollableMenuUtilTooltip = {
  id: "01a06275-c44a-7df7-b767-4561076aeb19",
  pageTypeSlug: "module",
  slug: "scrollable-menu-util-tooltip",
  definition: "the placement and display of the tooltip for a menu entry",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A custom tooltip function replaces the game tooltip entirely.",
    },
    {
      invariantKind: "constraint",
      statement: "The tooltip flips side when its text would overflow the screen edge.",
    },
    {
      invariantKind: "departure",
      statement: "Hovering an entry without a submenu hides any visible submenu first.",
    },
    {
      invariantKind: "departure",
      statement: "The selected-entry sound is silenced by swapping the game sound table entry.",
    },
  ],
} as const satisfies Module
