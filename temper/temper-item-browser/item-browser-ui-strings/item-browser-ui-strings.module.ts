import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const itemBrowserUiStrings = {
  id: "01a06178-3723-70ca-b442-161406dbdbd6",
  pageTypeSlug: "module",
  slug: "item-browser-ui-strings",
  definition: "the English text this add-on adds to the game's table of strings",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The text here is English alone.",
    },
  ],
} as const satisfies Module
