import type { Module } from "@akasha/code-system/module"

export const scrollableMenuComboboxBaseHiddenReasons = {
  id: "01a06275-c445-7aff-80e4-09159398a759",
  pageTypeSlug: "module",
  slug: "scrollable-menu-combobox-base-hidden-reasons",
  definition: "the decision on whether this click should hide the menu",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A click on an edit box or a slider or a multi-icon inside a context menu is excused.",
    },
    {
      invariantKind: "departure",
      statement:
        "The moused-over control is replaced by its parent for button-bearing entry types.",
    },
    {
      invariantKind: "departure",
      statement: "The final answer is delegated to a per-class GetHiddenForReasons function.",
    },
    {
      invariantKind: "departure",
      statement: "Verbose tracing sits behind a local flag that is hard-coded to false.",
    },
  ],
} as const satisfies Module
