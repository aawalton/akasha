import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const displayCategoryConstants = {
  id: "01a06127-6628-72fa-ab27-53d7049284ec",
  pageTypeSlug: "module",
  slug: "display-category-constants",
  definition:
    "the display category numbers the game client holds, each under the name the client spells it with",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Each number is read out of the client rather than written down here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here turns a number into display text.",
    },
  ],
} as const satisfies Module
