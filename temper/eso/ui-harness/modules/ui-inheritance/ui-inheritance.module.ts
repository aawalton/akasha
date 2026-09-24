import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const uiInheritance = {
  id: "01a0d3e7-657e-7545-90cc-7aa7f90b052a",
  type: "page-type/module",
  slug: "ui-inheritance",
  definition: "a control template, and what a control takes from the templates it inherits",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "What a control states wins over what a template it inherits states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A template inheriting another takes that other's children before its own.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Two children of one control cannot share a name, so concatenating them collides.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A child overrides the inherited control its name resolves to, however deep.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A control overridden deep keeps its own name, so it is named as its parent says.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A control overridden keeps its own kind, whatever element overrides it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A control nested in another takes the templates it inherits, as one at the top does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The handlers a control writes join those it inherits, and its own win.",
    },
  ],
} as const satisfies Module
