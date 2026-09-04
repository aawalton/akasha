import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const searchStylePageFilter = {
  id: "01a0613a-e0b0-7abb-9113-6a345a4c8717",
  pageTypeSlug: "module",
  slug: "search-style-page-filter",
  definition:
    "whether an item is a collectible style page, narrowed by an include or exclude toggle",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A style page is client specialized item type 82.",
    },
    {
      invariantKind: "departure",
      statement:
        "An item with no specialized item type fails the toggle whichever setting the player chose.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here narrows the server request.",
    },
  ],
} as const satisfies Module
