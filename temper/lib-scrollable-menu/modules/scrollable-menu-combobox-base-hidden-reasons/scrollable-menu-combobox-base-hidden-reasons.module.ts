import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuComboboxBaseHiddenReasons = {
  id: "01a06275-c445-7aff-80e4-09159398a759",
  type: "page-type/module",
  slug: "scrollable-menu-combobox-base-hidden-reasons",
  definition: "the decision on whether this click should hide the menu",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A click on an edit box or a slider or a multi-icon inside a context menu is excused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The moused-over control is replaced by its parent for button-bearing entry types.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The final answer is delegated to a per-class GetHiddenForReasons function.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Verbose tracing sits behind a local flag that is hard-coded to false.",
    },
  ],
} as const satisfies Module
