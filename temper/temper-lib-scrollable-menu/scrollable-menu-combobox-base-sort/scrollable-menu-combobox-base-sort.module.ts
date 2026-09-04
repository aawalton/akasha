import type { Module } from "@akasha/code-system/module"

export const scrollableMenuComboboxBaseSort = {
  id: "01a06275-c446-79bc-8539-5dfc32e93fe4",
  pageTypeSlug: "module",
  slug: "scrollable-menu-combobox-base-sort",
  definition:
    "the sorting and filtering behaviour a menu falls back to when no option overrides it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The default filter is a case-insensitive substring match on the entry name.",
    },
    {
      invariantKind: "departure",
      statement:
        "Filtering and sorting are both disabled on the base class and enabled by subclasses.",
    },
    {
      invariantKind: "departure",
      statement:
        "A custom sort button overrides the texture or the dimensions or the anchor alone.",
    },
    {
      invariantKind: "constraint",
      statement: "A sort container widens itself to fit an oversized custom button.",
    },
  ],
} as const satisfies Module
