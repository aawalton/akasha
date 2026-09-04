import type { Module } from "@akasha/code-system/module"

export const scrollableMenuDropdownPrivate = {
  id: "01a06275-c448-78fd-8436-b6770bf3e427",
  pageTypeSlug: "module",
  slug: "scrollable-menu-dropdown-private",
  definition: "the private helper table of the dropdown class and its automatic-refresh triggers",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The private table is registered on the library classes table under its own key.",
    },
    {
      invariantKind: "departure",
      statement: "An entry can declare a data key that raises a refresh of itself and its parents.",
    },
    {
      invariantKind: "departure",
      statement: "Parent rows are refreshed by walking the m_parentControl chain upward.",
    },
    {
      invariantKind: "departure",
      statement: "An icon change fires a library callback even where no refresh follows.",
    },
  ],
} as const satisfies Module
