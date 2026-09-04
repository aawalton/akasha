import type { Module } from "@akasha/code-system/module"

export const scrollableMenuUtilData = {
  id: "01a06275-c449-7ef3-b576-08766fcd81b5",
  pageTypeSlug: "module",
  slug: "scrollable-menu-util-data",
  definition: "the readers that resolve a control to its name and to its underlying data table",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Control names are memoised in a table keyed by the control itself.",
    },
    {
      invariantKind: "departure",
      statement: "A preventer variable counts down and clears once the count reaches zero.",
    },
    {
      invariantKind: "constraint",
      statement: "An unnamed control resolves to the literal string n slash a.",
    },
    {
      invariantKind: "departure",
      statement: "A texture path is judged valid by its dds suffix alone.",
    },
  ],
} as const satisfies Module
