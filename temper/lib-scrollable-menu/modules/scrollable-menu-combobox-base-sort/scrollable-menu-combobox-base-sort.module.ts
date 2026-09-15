import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuComboboxBaseSort = {
  id: "01a06275-c446-79bc-8539-5dfc32e93fe4",
  type: "page-type/module",
  slug: "scrollable-menu-combobox-base-sort",
  definition:
    "the sorting and filtering behaviour a menu falls back to when no option overrides it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The default filter is a case-insensitive substring match on the entry name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Filtering and sorting are both disabled on the base class and enabled by subclasses.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A custom sort button overrides the texture or the dimensions or the anchor alone.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A sort container widens itself to fit an oversized custom button.",
    },
  ],
} as const satisfies Module
