import type { Module } from "@akasha/code-system/module"

export const keybinderSearchBox = {
  id: "01a06381-67c1-7df3-9f12-953a58355bdc",
  pageTypeSlug: "module",
  slug: "keybinder-search-box",
  definition: "the search field the add-on adds to the key-bind window",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The field collapses to an icon while the field is empty and unfocused.",
    },
    {
      invariantKind: "departure",
      statement: "Escape clears the field and gives up focus.",
    },
  ],
} as const satisfies Module
